const dbConnect = require('../database/dbconnect');
const bcrypt = require('bcrypt');

function appointmentList(req, res) {
    console.log(req.session)
    if (false) {
        res.sendStatus(401);
    } else {
        dbConnect("nitradoSQL.json", function(db) {
            if (db == null) {
                console.log("Detected connection error");
                res.sendStatus(500);
            } else {
                db.query("DELETE FROM todos WHERE USER = ? AND ID = ?;", [req.body.username, req.body.id], function(err, result, fields) {
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