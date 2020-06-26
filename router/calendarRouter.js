const express = require('express');
const router = express.Router();

const appointment = require("../modules/appointmentListModule");
const createAppointment = require("../modules/appointmentCreateModule");
const deleteAppointment = require("../modules/appointmentRemoveModule");

router.post("/appointment/list", function(req, res) {
    appointment(req, res);
});

router.post("/appointment/create", function(req, res) {
    if (!req.body.username || !req.body.title || !req.body.time.from || !req.body.time.to) {
        res.status(400).send({
            "error": "please_give_all_parameters",
            "data": req.body
        });
    } else {
        createAppointment(req, res);
    }
});
router.post("/appointment/remove", function(req, res) {
    if (!req.body.username || !req.body.id) {
        res.status(400).send({
            "error": "please_give_all_parameters",
            "data": req.body
        });
    } else {
        deleteAppointment(req, res);
    }
});

module.exports = router;