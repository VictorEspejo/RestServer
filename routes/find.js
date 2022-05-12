const { Router } = require("express");
const { find } = require("../controllers/find");

const router = Router();

router.get("/:coleccion/:termino", find);

module.exports = router;
