const { response } = require("express");
const { request } = require("express");
const Product = require("../models/product");

const createProduct = async (req = request, res = response) => {
  try {
    const { user, ...data } = req.body;
    const { userAuth } = req;
    const productDb = await Product.findOne({ name: data.name.toUpperCase() });
    if (productDb)
      return res.status(400).json({ msg: "El producto ya existe" });

    data.user = userAuth._id;

    const newProduct = new Product(data);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.warn(error);
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error al guardar el producto" });
  }
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const productDB = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");
  if (!productDB) return res.status(400).json({ msg: "No existe el producto" });
  res.json(productDB);
};

const getProducts = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { status: true };
  const productsDB = await Promise.all([
    Product.countDocuments(),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  const [total, products] = productsDB;
  res.json({ total, products });
};

const updateProduct = async (req = request, res = response) => {
  let {
    params: { id },
    body: { user, status, id: bodyId, ...data },
    userAuth,
  } = req;
  data.user = userAuth._id;

  try {
    if (data.name) {
      const productDBName = await Product.findOne({
        name: data.name.toUpperCase(),
      });
      if (productDBName)
        return res
          .status(400)
          .json({ msg: "El nombre del producto ya existe" });
    }

    const newProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(newProduct);
  } catch (error) {
    console.warn(error);
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error al actualizar el producto" });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const {
    params: { id },
  } = req;

  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.warn(error);
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error al eliminar el producto" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
