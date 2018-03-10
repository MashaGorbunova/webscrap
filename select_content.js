
exports.content = function(callback){
    mysqlConnect.query("SELECT COUNT(*) AS total FROM contents; SELECT * FROM contents ORDER BY id DESC LIMIT ?, ?", [offset, limit], function (err, result, fields) {
            if (err) throw err;
            callback(undefined, result);
    });
}


