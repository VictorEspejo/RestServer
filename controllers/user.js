const { response, request } = require("express");
const Users = require('../models/usuario.js');

const usuariosGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "get API - controlador",
    query
  });
};

const usuariosPOST = async (req = request, res = response) => {
  const body = req.body;
  const usuario = new Users(body);
  await usuario.save();
  
  res.json({
    msg: "post API - controlador",
    usuario
  });
};

const usuariosPUT = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API -controlador",
    id
  });
};

const usuariosPATCH = (req = request, res = response) => {
  res.json({
    msg: "path API -controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPOST,
  usuariosPATCH,
  usuariosPUT,
};
