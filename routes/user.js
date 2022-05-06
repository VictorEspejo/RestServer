const { Router } = require("express");
const {
  usuariosGet,
  usuariosPUT,
  usuariosPOST,
  usuariosDELETE,
} = require("../controllers/user");
const { check } = require("express-validator");
const {
  validarCampos,
  validarJWT,
  haveRol,
  isAdminRole,
} = require("../middlewares");
const {
  isRoleValido,
  existsEmail,
  existUserById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isRoleValido),
    validarCampos,
  ],
  usuariosPUT
);

router.post(
  "/",
  [
    check("email", "Email no válido").isEmail(),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "El password debe ser de mas de 6 letras").isLength({
      min: 6,
    }),
    check("email").custom(existsEmail),
    check("role").custom(isRoleValido),
    validarCampos,
  ],
  usuariosPOST
);

router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    haveRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existUserById),
    validarCampos,
  ],
  usuariosDELETE
);

module.exports = router;
