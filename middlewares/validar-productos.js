const { Product } = require("../models");

const existsProductById = async (id) => {
  try {
    const productDb = await Product.findById(id);
    if (!productDb || !productDb.status)
      throw new Error("No existe el producto para ese id");
  } catch (error) {
    console.warn(error);
    throw new Error("No existe el producto para ese id");
  }
};

module.exports = {
  existsProductById,
};
