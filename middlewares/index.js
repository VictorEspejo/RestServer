const validarCampos = require("./validar-campos");
const validarJWT = require("./validar-jwt");
const validarRoles = require("./validar-roles");
const validarProductos = require("./validar-productos");
const findDB = require("./find-database");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
  ...validarProductos,
  ...findDB,
};
