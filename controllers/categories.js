const { response, request } = require("express");
const { Category } = require("../models");

const createCategory = async (req = request, res = response) => {
  const { name } = req.body;
  const categoryDb = await Category.findOne({ name: name.toUpperCase() });
  if (categoryDb)
    return res.status(400).json({ msg: "La categoria ya existe" });
  const data = {
    name,
    user: req.userAuth._id,
  };

  const category = new Category(data);
  await category.save();
  res.status(201).json(category);
};

const getCategories = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { status: true };
  const categoriesDb = await Promise.all([
    Category.countDocuments(),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  const [total, categories] = categoriesDb;
  res.json({ total, categories });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const categoryDb = await Category.findById(id).populate("user", "name");
  if (!categoryDb)
    return res.status(400).json({ msg: "No existe esa categoria" });
  res.json(categoryDb);
};

const updateCategory = async (req = request, res = response) => {
  const {
    params: { id },
    body: { name },
    userAuth,
  } = req;
  const data = { name, user: userAuth._id };

  try {
    const categoryDB = await Category.findOne(data);
    if (categoryDB)
      return res
        .status(400)
        .json({ msg: "El nombre de la categoria ya existe" });

    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error al actualizar la categoria" });
  }
};

const deleteCategory = async (req = request, res = response) => {
  const {
    params: { id },
    userAuth,
  } = req;

  try {
    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.status(200).json(deletedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error al eliminar la categoria" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
