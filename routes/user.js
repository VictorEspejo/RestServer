const { Router } = require("express");
const {
  usuariosGet,
  usuariosPUT,
  usuariosPOST,
  usuariosPATCH,
} = require("../controllers/user");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPUT);

router.post("/", usuariosPOST);

router.patch("/", usuariosPATCH);

module.exports = router;
