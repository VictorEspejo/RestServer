const Role = require("../models/role.js");
const User = require("../models/usuario.js");

const isRoleValido = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) throw new Error("El role no es valido");
};

//Verificar que el correo existe
const existsEmail = async (email = "") => {
  const userEmail = await User.findOne({ email });
  if (userEmail) throw new Error("El email ya existe");
};

const existUserById = async (id = "") => {
  const existUser = await User.findById(id);
  if (!existUser || !existUser.status) throw new Error("El usuario no existe");
};

module.exports = {
  isRoleValido,
  existsEmail,
  existUserById,
};
