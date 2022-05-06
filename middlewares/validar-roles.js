const { request, response } = require("express");

//Obtiene el usuario autenticado de la request y comprueba que tenga role administrador
const isAdminRole = (req = request, res = response, next) => {
  if (!req.userAuth)
    return res
      .status(500)
      .json({ msg: "No es posible validar el tipo de usuario" });
  const { role, name } = req.userAuth;
  if (role !== "ADMIN_ROLE")
    return res
      .status(401)
      .json({
        msg: `El usuario ${name} no tiene permisos de administrador para ejecutar esta accion`,
      });
  next();
};

const haveRol = (...roles) => {
  return (req, res, next) => {
    if (!req.userAuth)
      return res
        .status(500)
        .json({ msg: "No es posible validar el tipo de usuario" });

    if(!roles.includes(req.userAuth.role)) return res.status(401).json({ msg: 'El usuario no tiene ningun rol permitido para realizar la operacion', roles})
    next();
  };
};

module.exports = {
  isAdminRole,
  haveRol,
};
