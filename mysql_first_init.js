var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS nodejs", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query("USE nodejs", function (err, result) {
    if (err) throw err;
    console.log("Database used");
  });

  var sql = "CREATE TABLE IF NOT EXISTS contents (id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, title VARCHAR(1000), category VARCHAR(1000), content_date VARCHAR(255), content TEXT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table contents created");
  });

});