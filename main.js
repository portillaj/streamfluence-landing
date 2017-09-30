//require express, mongoose, body-parser
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    axios          = require("axios");

const port = process.env.PORT || 3000;

//get the css and images files from public directory
app.use(express.static(__dirname + "/public"));
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
});//end client Twitter constructor

client.get('search/tweets', {q: 'donald trump'}, function(error, tweets, response) {
   console.log(tweets.statuses[0].text);
});

// var url = 'https://api.twitter.com/oauth/authorize';
//
// axios.get(url)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});
//server listening
app.listen(port, function(){
    console.log("client App server has started");
});
