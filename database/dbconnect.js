function connectMySQL(config, callback) {
    const fs = require("fs");
    const mysql = require("mysql");

    let rawdata = fs.readFileSync('./config/' + config);
    let mysqlConfigParams = JSON.parse(rawdata);

    let db = mysql.createConnection({
        host: mysqlConfigParams.host,
        user: mysqlConfigParams.user,
        password: mysqlConfigParams.password,
        database: mysqlConfigParams.database
    });

    return db.connect((err) => {
        if (err) {
            console.log("Connection failed!")
            return callback(null);
        } else {
            return callback(db);
            console.log('Connected to database');
        }
    });
}

module.exports = connectMySQL;