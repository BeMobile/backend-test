const router = require("express").Router();
const express = require("express");

// import controller
const saleContoller = require("../controllers/sale.controllers");

// import middlewares
const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/sales", isAuthenticated, attachCurrentUser, saleContoller.create);

module.exports = router;
