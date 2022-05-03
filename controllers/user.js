const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "get API - controlador",
    query
  });
};

const usuariosPOST = (req = request, res = response) => {
  const body = req.body;

  res.json({
    msg: "post API - controlador",
    body
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
