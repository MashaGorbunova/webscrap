var request = require("request"),
    cheerio = require("cheerio");
    
var url = "https://ain.ua";
var categoryLink = [],
    postItem     = [],
    insertData   = [];

exports.scrapAndInsert = function (){
    request(url, function (error, response, body) {
    var count = 0;
    if (!error) {
        var $ = cheerio.load(body);
        $('.post-item').each(function(i, element){
            var link = $(this).find('.category-wrapper a.category').attr('href');
           
            if(!categoryLink.includes(link)){
                categoryLink[i] = link;
                if(link !== 'undefined'){
                    postItem[count++] = {'categoryHref' : link, 'href' : $(this).find('a.post-link').attr('href')};
                }    
            }
        });

        count = 0;
        for(var i=0; i < postItem.length; i++){
            if(postItem[i].categoryHref !== 'undefined') {
                    request(postItem[i].href, function (error, response, body) {
                        if (!error){
                            var $ = cheerio.load(body);
                            var block = $('.block-wrap-content');
                            
                            if(block.find('h1').text() && block.find('.post-category').text() && block.find('.post-date').text() && block.find('#post-content').html()){
                                insertData[count++] = [ 
                                    block.find('h1').text(), 
                                    block.find('.post-category').text(),
                                    block.find('.post-date').text(), 
                                    block.html() 
                                ];
                            }
                            if(insertData.length == 5){
                                var sql = "INSERT INTO contents (title, category, content_date, content) VALUES ?";
                                    mysqlConnect.query(sql, [insertData], function (err, result) {
                                        if (err) throw err;
                                        console.log("record inserted"  + result.affectedRows);
                                    });
                            }
                        }
                        else {
                            console.log(error);
                        }

                    });
            } 
        }
        
    } else {
        console.log(error);
    }
});    
}

