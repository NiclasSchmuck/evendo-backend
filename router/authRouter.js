const express = require('express');
const router = express.Router();

const login = require("../modules/loginModule");
const register = require("../modules/registerModule");
const removeUser = require("../modules/removeUserModule");

router.post("/login", function(req, res) {
    login(req, res);
});

router.post("/register", function(req, res) {
    register(req, res);
});


router.post("/removeUser", function(req, res) {
    removeUser(req, res);
});


router.get("/", function(req, res) {
    res.json({
        "status": "running"
    })
})


module.exports = router;