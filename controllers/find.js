const { response, request } = require("express");
const { findUsers, findProduct, findCategory } = require("../middlewares");

const collections = {
  users: findUsers,
  products: findProduct,
  categories: findCategory,
};

const find = (req = request, res = response) => {
  const { coleccion, termino } = req.params;
  if (!collections[coleccion])
    return res.status(400).json({ msg: "La coleccion no existe" });

  collections[coleccion](termino, res);
};

module.exports = {
  find,
};
