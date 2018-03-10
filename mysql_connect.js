var mysql = require('mysql');

exports.connection = function () {
    mysqlConnect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodejs",
        multipleStatements: true
    });
    return mysqlConnect;
};
