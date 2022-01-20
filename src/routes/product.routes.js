const router = require("express").Router();

const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

const productControllers = require("../controllers/product.controllers");

router.post(
  "/products",
  isAuthenticated,
  attachCurrentUser,
  productControllers.create
);

router.get(
  "/products",
  isAuthenticated,
  attachCurrentUser,
  productControllers.findAll
);

router.get(
  "/products/:id",
  isAuthenticated,
  attachCurrentUser,
  productControllers.findById
);

router.put(
  "/products/:id",
  isAuthenticated,
  attachCurrentUser,
  productControllers.update
);

router.delete(
  "/products/:id",
  isAuthenticated,
  attachCurrentUser,
  productControllers.delete
);

module.exports = router;
