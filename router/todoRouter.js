const express = require('express');
const router = express.Router();

const todo = require("../modules/todoListModule");
const createTodo = require("../modules/todoCreateModule");
const deleteTodo = require("../modules/todoRemoveModule");

router.post("/todo/list", function(req, res) {
    todo(req, res);
});

router.post("/todo/create", function(req, res) {
    if (!req.body.username || !req.body.title || !req.body.time.from || !req.body.time.to) {
        res.status(400).send({
            "error": "please_give_all_parameters",
            "data": req.body
        });
    } else {
        createTodo(req, res);
    }
});
router.post("/todo/remove", function(req, res) {
    if (!req.body.username || !req.body.id) {
        res.status(400).send({
            "error": "please_give_all_parameters",
            "data": req.body
        });
    } else {
        deleteTodo(req, res);
    }
});

module.exports = router;