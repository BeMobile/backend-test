const router = require("express").Router();

const userControllers = require("../controllers/user.controllers");

const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/signup", userControllers.create);

router.post("/login", userControllers.createLogin);

router.get(
  "/users/:id",
  isAuthenticated,
  attachCurrentUser,
  userControllers.get
);

module.exports = router;
