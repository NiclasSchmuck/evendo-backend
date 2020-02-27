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
        if (!req.body.description) {
            req.body.description = null;
        }
        if (!req.body.invited) {
            req.body.invited = 0;
        }
        if (!req.body.repeatinterval) {
            req.body.repeatinterval = 0;
        }
        if (!req.body.notify) {
            req.body.notify = 0;
        }
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