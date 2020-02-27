const dbConnect = require('../database/dbconnect');
const bcrypt = require('bcrypt');

function createAppointment(req, res) {
    console.log(req.body)
    if(!req.body.username) {
        res.status(400);
    } else {
    dbConnect("nitradoSQL.json", function(db) {
        if (db == null) {
            console.log("Detected connection error");
            res.sendStatus(500);
        } else {
            db.query("INSERT INTO appointments (USER, TITLE, DESCRIPTION, TIME_FROM, TIME_TO, INVITED, NOTIFY_AT, REPEAT_INTERVAL) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [
                req.body.username,
                req.body.title,
                req.body.description,
                req.body.time.from,
                req.body.time.to,
                req.body.invited,
               req.body.notify,
               req.body.repeatinterval
            ], function(err, result, fields) {
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
}

module.exports = createAppointment;