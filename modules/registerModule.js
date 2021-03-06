const dbConnect = require('../database/dbconnect');
const bcrypt = require('bcrypt');

function register(req, res) {
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
                    if (result[0].existing === 0) {
                        console.log(req.body)
                        if (!req.body.password || !req.body.email || !req.body.username) {
                            res.status(500).send({
                                "error": "not_enough_parameters"
                            });
                            db.end();
                            return "ERR";
                        } else {
                            let password = bcrypt.hashSync(req.body.password, 10);
                            let email = req.body.email;
                            db.query("INSERT INTO users (USERNAME,PASSWORD,EMAIL) VALUES(?, ?, ?);", [req.body.username, password, email], function(err, result, fields) {
                                if (err) {
                                    res.status(500).send({
                                        "error": err
                                    });
                                    db.end();
                                    return "ERR";
                                } else {
                                    res.status(200).send({
                                        "status": "registered"
                                    })
                                    db.end();
                                    return "DONE";
                                }
                            });
                        }
                    } else {
                        res.status(400).send({ "error": "username_already_exists" })
                        db.end();
                        return "ERR";
                    }
                }
            });
        }
    });
}

module.exports = register;