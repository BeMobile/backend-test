const router = require("express").Router();

const phoneControllers = require("../controllers/phone.controllers");

const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.put(
  "/phones/:idClient",
  isAuthenticated,
  attachCurrentUser,
  phoneControllers.update
);

router.get(
  "/phones",
  isAuthenticated,
  attachCurrentUser,
  phoneControllers.findAll
);

module.exports = router;
