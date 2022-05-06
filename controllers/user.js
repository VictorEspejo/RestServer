const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../models/usuario.js");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;

  //Filtro
  const query = { status: true };

  const response = await Promise.all([
    Users.count(),
    Users.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  const [ total, usuarios ]= response;

  res.json({ total, usuarios });
};

const usuariosPOST = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const usuario = new Users({ name, email, password, role });
  const salt = bcrypt.genSaltSync(10); //Numero de vueltas para encriptar la pass
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();
  res.json(usuario);
};

const usuariosPUT = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...reqBody } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync(10); //Numero de vueltas para encriptar la pass
    reqBody.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Users.findByIdAndUpdate(id, reqBody);
  res.json(usuario);
};

const usuariosDELETE = async (req = request, res = response) => {
  const { params: { id }, userAuth } = req;
  //Marcamos como borrado al actualizar el status
  const usuario = await Users.findByIdAndUpdate(id, { status: false });
  res.json({usuario, userAuth});
};

module.exports = {
  usuariosGet,
  usuariosPOST,
  usuariosDELETE,
  usuariosPUT,
};
