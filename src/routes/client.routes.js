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
  clientControler.finAll
);

router.get(
  "/clients/:id",
  isAuthenticated,
  attachCurrentUser,
  clientControler.findById
);

// verificar erro update
router.put(
  "/update/clients/:id",
  isAuthenticated,
  attachCurrentUser,
  clientControler.update
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  attachCurrentUser,
  clientControler.delete
);
module.exports = router;
