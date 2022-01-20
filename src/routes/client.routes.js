const router = require("express").Router();

const clientControler = require("../controllers/client.controllers");

const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post(
  "/clients",
  isAuthenticated,
  attachCurrentUser,
  clientControler.create
);

router.get(
  "/clients",
  isAuthenticated,
  attachCurrentUser,
  clientControler.findAll
);

router.get(
  "/clients/:id",
  isAuthenticated,
  attachCurrentUser,
  clientControler.findById
);

// verificar erro update
router.put(
  "/clients/:id",
  isAuthenticated,
  attachCurrentUser,
  clientControler.update
);

router.delete(
  "/clients/:id",
  isAuthenticated,
  attachCurrentUser,
  clientControler.delete
);
module.exports = router;
