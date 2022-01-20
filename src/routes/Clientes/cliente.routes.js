const cliente = require("../../controllers/Clientes/cliente.controller.js");

var router = require("express").Router();

router.post("/store", cliente.create);

router.get("/show/:id", cliente.show);

router.get("/index", cliente.index);

router.put("/update/:id", cliente.update);

router.delete("/delete/:id", cliente.delete);



module.exports = router;