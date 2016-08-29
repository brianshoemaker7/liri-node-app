var fs = require('fs');

if (process.argv[2] === 'my-tweets') {

var Twitter = require('twitter');
var keys = require('./keys.js');


var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});
 
var params = {screen_name: '@brianshoemaker7'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

} else if (process.argv[2] === 'movie-this') {

var request = require('request');

var movieName = process.argv[3]; 
// Then run a request to the OMDB API with the movie specified 
var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json';

// Then create a request to the queryUrl
// ...
request(queryUrl, function(err, response, body) {
	body = JSON.parse(body);
	console.log(body);
})

}  else if (process.argv[2]  === 'spotify-this-song'){

 
 var songName = process.argv[3];

 var spotify = require('spotify');
 
spotify.search({ type: 'track', query: songName}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data);
})

}