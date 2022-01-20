const user = require("../../controllers/Usuarios/user.controller.js");

var router = require("express").Router();

router.post("/signup", user.create);

router.get("/login", user.login);

router.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})
module.exports = router;