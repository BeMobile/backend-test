const router = require("express").Router();

const addresControllers = require("../controllers/addres.controllers");

const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.put(
  "/address/:idClient",
  isAuthenticated,
  attachCurrentUser,
  addresControllers.update
);

router.get(
  "/address",
  isAuthenticated,
  attachCurrentUser,
  addresControllers.findAll
);

module.exports = router;
