const { response } = require("express");
const { User, Category, Product } = require("../models");
const { ObjectId } = require("mongoose").Types;

const ACTIVE = { status: true };

const findUsers = async (termino = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(termino);
    if (isMongoId) {
      const userDB = await User.findById(termino);
      return res.json(userDB ? userDB : []);
    }
    const regex = RegExp(termino, "i");
    const usuarios = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [ACTIVE],
    });
    return res.json({ usuarios });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener usuario" });
  }
};

const findProduct = async (termino = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(termino);
    if (isMongoId) {
      const productDB = await Product.findById(termino)
        .populate("category", "name")
        .populate("user", "name");
      return res.json(productDB ? productDB : []);
    }
    const regex = RegExp(termino, "i");
    const products = await Product.find({ name: regex, status: true })
      .populate("category", "name")
      .populate("user", "name");
    return res.json({ products });
  } catch (error) {
    console.warn(error);
    return res.status(500).json({ msg: "Error al obtener productos" });
  }
};

const findCategory = async (termino = "", res = response) => {
  try {
    const isMongoId = ObjectId.isValid(termino);
    if (isMongoId) {
      const categoryDB = await Category.findById(termino).populate(
        "user",
        "name"
      );
      return res.json(categoryDB);
    }
    const regex = RegExp(termino, "i");
    const categories = await Category.find({
      name: regex,
      status: true,
    }).populate("user", "name");
    return res.json({ categories });
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener categorias" });
  }
};

module.exports = {
  findUsers,
  findProduct,
  findCategory,
};
