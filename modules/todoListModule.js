const dbConnect = require('../database/dbconnect');
const bcrypt = require('bcrypt');

function appointmentList(req, res) {
    if(!req.body.username) {
        res.status(400);
    } else {
    console.log(req.session)
        dbConnect("nitradoSQL.json", function(db) {
            if (db == null) {
                console.log("Detected connection error");
                res.sendStatus(500);
            } else {
                db.query("SELECT * FROM todos WHERE USER = ?;", [req.body.username], function(err, result, fields) {
                    if (err) {
                        res.status(500).send({
                            "error": err
                        });
                        db.end();
                    } else {
                        res.status(200).send(result);
                        db.end();
                    }
                });
            }
        });
    }
}

module.exports = appointmentList;