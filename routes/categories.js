const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categories");
const { validarJWT, validarCampos, isAdminRole } = require("../middlewares");
const { existsCategoryById } = require("../middlewares/validar-categorias");

const router = Router();
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  createCategory
);

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existsCategoryById),
    validarCampos,
  ],
  getCategory
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existsCategoryById),
    check("name", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existsCategoryById),
    validarCampos,
  ],
  deleteCategory
);

module.exports = router;
