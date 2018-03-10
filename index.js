var http = require('http');
var fs = require('fs');
var url = require('url');
mysql = require('./mysql_connect.js');
mysqlConnect = mysql.connection();

// scrap 5 articles and save in DB
var scrapping = require('./scrapping.js');
var insert = scrapping.scrapAndInsert();

http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    
    var params = [];
    var page;
 
    if(query != null){
        if(query.indexOf('&') !== -1){
        var queryParams = query.split('&');
        for(var i=0; i< queryParams.length; i++){
            params [i] = queryParams[i].split('=');
            if(params[i].length == 2 && params[i][0] == 'page'){
                page = params[i][1];
            }
        }
    }
    else {
        params = query.split('=');
        if(params.length == 2 && params[0] == 'page'){
                page = params[1];
            }
    }
    }
    else page = 1;
    
    if(!parseInt(page)){
        page = 1;
    }
    
    limit = 5;
    offset = (0 + limit) * (page - 1);  

    if(path=="/select_content"){  
            
        var content = require('./select_content.js');
       
        content.content(function(err, result){
            res.write(JSON.stringify(result)); 
            return res.end();
        });
    }
    else {
               
        //Open a file on the server and return it's content:
        fs.readFile('./index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }
  
}).listen(8090);
