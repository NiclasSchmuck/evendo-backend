const dbConnect = require('../database/dbconnect');
const bcrypt = require('bcrypt');

function removeUser(req, res) {
    dbConnect("nitradoSQL.json", function(db) {
        if (db == null) {
            console.log("Detected connection error");
            res.sendStatus(500);
        } else {
            db.query("SELECT EXISTS(SELECT * FROM users WHERE EMAIL = ? OR username = ?) as existing;", [req.body.email, req.body.username], function(err, result, fields) {
                if (err) {
                    res.status(500).send({
                        "error": err
                    });
                    db.end();
                    return "ERR";
                } else {
                    console.log(result)
                    if (result[0].existing === 0) {
                        res.status(400).send({
                            "error": "does_not_exists"
                        })
                    } else {
                        let email = req.body.email;
                        let username = req.body.username;
                        if (email || username || password) {
                            db.query("DELETE FROM users WHERE USERNAME = ? AND EMAIL = ?;", [req.body.username, email], function(err, result, fields) {
                                if (err) {
                                    res.status(500).send({
                                        "error": err
                                    });
                                    db.end();
                                    return "ERR";
                                } else {
                                    res.status(200).send({
                                        "status": "removed"
                                    })
                                    db.end();
                                    return "DONE";
                                }
                            });
                        } else {
                            res.status(400).send({
                                "error": "no_parameters"
                            })
                            db.end();
                        }
                    }
                }
            });
        }
    });
}

module.exports = removeUser;