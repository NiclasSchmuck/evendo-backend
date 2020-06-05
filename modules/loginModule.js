const dbConnect = require('../database/dbconnect');
const bcrypt = require('bcrypt');

function login(req, res) {
    console.log(req.body)
    dbConnect("nitradoSQL.json", function(db) {
        if (db == null) {
            console.log("Detected connection error");
            res.sendStatus(500);
        } else {
            db.query("SELECT *  FROM users WHERE username = ?;", [req.body.username], function(err, result, fields) {
                if (err) {
                    res.status(500).send({
                        "error": err
                    });
                    db.end();
                } else {
                    if (result.length > 1) {
                        res.status(500).send({ "error": "data_inconsistency_checked" });
                    } else {
                        if (result === undefined || result.length === 0) {
                            res.status(400).send({ "error": "bad credentials" })
                        } else {
                            result = result[0];
                            if (bcrypt.compareSync(req.body.password, result.PASSWORD)) {
                                req.session.user = {
                                    account: { "email": result.EMAIL, "username": result.USERNAME }
                                };
                                res.send({
                                    "status": "logged_in",
                                    "session": req.session.user
                                });
                            } else {
                                res.status(400).send({ "error": "bad crendentials" });
                            }
                        }
                    }
                    db.end();
                }
            });
        }
    });
}

module.exports = login;
