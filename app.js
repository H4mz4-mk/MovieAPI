var express = require("express"),
    request = require("request"),
    app     = express();
app.set("view engine" , "ejs");


app.get("/", function(req , res){
    res.render("search");
});
app.get("/results", function(req , res){
    var value = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + value + "&apikey=99c5b6&r=json";
    request(url, function(error, response, body){
        if( response.statusCode === 200 ){
            var data = JSON.parse(body);
            if(data.Response === "False"){
                res.render("error");
            }
            res.render("results" , {data : data});
        }
    });  
});
app.get("*", function(req, res){
    res.render('wrongpath');
});


app.listen(3000, function(){
    console.log("server is ON, PORT 3000");
});