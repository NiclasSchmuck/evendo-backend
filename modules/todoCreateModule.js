const dbConnect = require('../database/dbconnect');
const bcrypt = require('bcrypt');

function createAppointment(req, res) {
    console.log(req.body)
    dbConnect("nitradoSQL.json", function(db) {
        if (db == null) {
            console.log("Detected connection error");
            res.sendStatus(500);
        } else {
            db.query("INSERT INTO todos (USER, TITLE, DESCRIPTION, TIME_FROM, TIME_TO, INVITED, NOTIFY_AT, REPEAT_INTERVAL)" +
            "VALUES (:username, :title, :description, :timefrom, :timeto, :invited, :notify, :repeatinterval);", {
                username : req.body.username,
                title: req.body.title,
                description: req.body.description,
                timefrom: req.body.time.from,
                timeto: req.body.time.to,
                invited: req.body.invited,
                notify: req.body.notify,
                repeatinterval: req.body.repeatinterval
            }, function(err, result, fields) {
                if (err) {
                    res.status(500).send({
                        "error": err
                    });
                    db.end();
                } else {
                    res.status(200).send({
                        "status": "created",
                        "data": req.body,
                        "result": result
                    });
                    db.end();
                }
            });
        }
    });
}

module.exports = createAppointment;