const { Category } = require("../models");

const existsCategoryById = async (id = "") => {
  const categoryDB = await Category.findById(id);
  if (!categoryDB || !categoryDB.status)
    throw new Error("La categoria no existe");
};

const existsCategoryByName = async (name = "") => {
  const categoryDB = await Category.findOne({ name: name.toUpperCase() });
  if (!categoryDB || !categoryDB.status)
    throw new Error("La categoria no existe");
};

const checkUserCategory = (category, user) => {
  return category.user.id === user;
};

module.exports = {
  existsCategoryById,
  existsCategoryByName,
  checkUserCategory,
};
