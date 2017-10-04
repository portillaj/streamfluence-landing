//require express, mongoose, body-parser
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    axios          = require("axios");

const port = process.env.PORT || 3000;

//get the css and images files from public directory
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
var Twitter = require('twitter');

var consumerKey = 'o7PgWt6MzKhlgFRQLXcisGY7E';
var consumerSecret = 'qhN6VH9p5Fa35zl8Xo8IMyDIqJjqOLJttVbSMP09gKxgAesrKS';
var accessToken = '866351611374948352-6vwUsaLcT5Kt3SHkrufzoawhLQlqTdS';
var accessTokenSecret = 'LrdtjyuZVXkKT2P7iqLLTZqujHkxa7qopdl3559PLuUFV';

var client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
}); //end client Twitter constructor

app.get('/', function(req, res){
   client.get('statuses/user_timeline.json?screen_name=streamFluence&20' , function(error, tweets, response)  {
          res.render('index', {tweets: tweets });
   });

});
//server listening
app.listen(port, function(){
    console.log("client App server has started");
});
