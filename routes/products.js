const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  validarJWT,
  validarCampos,
  isAdminRole,
  existsProductById,
} = require("../middlewares");
const { existsCategoryById } = require("../middlewares/validar-categorias");

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    check("price", "El precio no esta en el formato incorrecto")
      .optional()
      .isFloat(),
    check("description", "La descripcion debe tener al menos 10 caracteres")
      .optional()
      .isLength({ min: 10 }),
    check("category", "La categoria no es valida").isMongoId(),
    check("category").custom(existsCategoryById),
    validarCampos,
  ],
  createProduct
);

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existsProductById),
    validarCampos,
  ],
  getProduct
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existsProductById),
    check("name", "El nombre es obligatorio").notEmpty(),
    check("price", "El precio no esta en el formato incorrecto")
      .optional()
      .isFloat(),
    check("description", "La descripcion debe tener al menos 10 caracteres")
      .optional()
      .isLength({ min: 10 }),
    check("category", "La categoria no es valida").optional().isMongoId(),
    check("category").optional().custom(existsCategoryById),
    validarCampos,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validarJWT,
    isAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existsProductById),
    validarCampos,
  ],
  deleteProduct
);

module.exports = router;
