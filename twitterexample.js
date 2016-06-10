var Twitter = require('twitter');
var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var spotify = require('spotify');

if (process.argv[2] === 'my-tweets') {

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret,
});
 
var params = {screen_name: '@brianshoemaker7'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

} else if (process.argv[2] === 'movie-this') {
var movieName = process.argv[3]; 
// Then run a request to the OMDB API with the movie specified 
var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json';

// This line is just to help us debug against the actual URL.  
console.log(queryUrl);


// Then create a request to the queryUrl
// ...
request(queryUrl, function(err, response, body) {
	body = JSON.parse(body);
	console.log(body);
})

}  else if (process.argv[2]  === 'spotify-this-song'){

 var SpotifyWebApi = require('spotify');

/*
 * This example shows how to search for a track. The endpoint is documented here:
 * https://developer.spotify.com/web-api/search-item/
 * Please note that this endpoint does not require authentication. However, using an access token
 * when making requests will give your application a higher rate limit.
 */

var spotifyApi = new SpotifyWebApi();

var songName = process.argv[3];

spotifyApi.searchTracks(songName, function(err, data) {
  if (err) {
    console.error('Something went wrong', err.message);
    return;
  }

  // Print some information about the results
  console.log('I got ' + data.body.tracks.total + ' results!');

  // Go through the first page of results
  var firstPage = data.body.tracks.items;
  console.log('The tracks in the first page are.. (popularity in parentheses)');

  /*
   * 0: All of Me (97)
   * 1: My Love (91)
   * 2: I Love This Life (78)
   * ...
   */
  firstPage.forEach(function(track, index) {
    console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
  });
});


}