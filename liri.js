//here's all the junk we need!
var keys = require('./keys'),
	fs = require('fs'),
	Twitter = require('twitter'),
	Spotify = require('spotify'),
	request = require('request');

var client = new Twitter(keys.twitterKeys); //I wish I knew more about this 'new Twitter'... the old Twitter is getting LAAAME

//our node input goes here :O)!!!
var nodeArgs = process.argv

//I've decided to make Liri an object!!!
var Liri = {
	//this is where our command line inputs will go before being turned into strings for querying.
	"query": [],

	//the following function does that work for us.
	"make-query": function() {
		//everything after process.argv[2] is pushed into the query array.
		for (var x = 3; x < nodeArgs.length; x++) {
			Liri["query"].push(nodeArgs[x]);
		}
		return Liri["query"].join(" ")
	},//end of make-query

	//function for requesting tweets from my account and logging to console.
	"my-tweets": function() {
			client.get('statuses/user_timeline.json?count=20', function(error, tweets, response) {
			  if(error) {
			  	throw error;

			  } else {
			  	console.log("My Tweets! :>")
			  	//iterating through at most twenty tweets and logging each, broken up manually with the equals signs.
			  	for (var x = 0; x < tweets.length; x++) {
			  		console.log(tweets[x].created_at)
			  		console.log(tweets[x].text)
			  		console.log("========================")
			  	};//end of for loop
			  };//end of conditional
			});//end of client.get()
	},//end of my-tweets

	"spotify-this-song": function() {
		var newQuery = Liri["make-query"]();
		//if newQuery is empty, we'll get "the Sign"
		if (newQuery === " ") {
			Spotify.get('/v1/tracks/3DYVWvPh3kGwPasp7yjahc', function(err, data) {
				if ( err ) {
			        console.log('Error occurred: ' + err);
			    } else {
			    console.log("Here's the info on 'the Sign' by Ace of Base for: ")
			    console.log("~~~~~~~~~~~~~")
			    console.log("Artist(s) Name: " + data.artists[0].name)
			    console.log("~~~~~~~~~~~~~")
			    console.log("Track Title: " + data.name)
			    console.log("~~~~~~~~~~~~~")
			    console.log("Preview Link: " + data.preview_url)
			    console.log("~~~~~~~~~~~~~")
			    console.log("Album Name: " + data.album.name)
			    console.log("~~~~~~~~~~~~~")
				};//end of nested conditional
			})//end of default Spotify query
		} else {
			//but if not, I GUESS we can do a search for whatever stupid song you want.
			Spotify.search({ type: 'track', query: newQuery }, function(err, data) {
			    if ( err ) {
			        console.log('Error occurred: ' + err);
			    } else {
			    	//the response object from spotify is so complicated xD!!
			    console.log("Here's the info on the song you searched for: ")
			    console.log("~~~~~~~~~~~~~")
			    console.log("Artist(s) Name: " + data.tracks.items[0].artists[0].name)
			    console.log("~~~~~~~~~~~~~")
			    console.log("Track Title: " + data.tracks.items[0].name)
			    console.log("~~~~~~~~~~~~~")
			    console.log("Preview Link: " + data.tracks.items[0].preview_url)
			    console.log("~~~~~~~~~~~~~")
			    console.log("Album Name: " + data.tracks.items[0].album.name)
			    console.log("~~~~~~~~~~~~~")
				};//end of second nested conditional
			});//end of the spotify query that takes in node input
		}//end of conditional
	},//end of spotify-this-song

	// this works basically the same way as the spotify-this-song function
	"movie-this": function() {
		var newQuery = Liri["make-query"]();
		if (newQuery === "") {
			request('http://www.omdbapi.com/?t='+"Mr.+Nobody", function (error, response, body) {
			  if (error) {
			  	console.log('error: ', error);
			  } else if (response.statusCode === 200) {
				var theGoods = JSON.parse(body)
				console.log("Here's the info for the movie 'Mr. Nobody': ");
			  	console.log("Movie Title: " + theGoods.Title);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Released: " + theGoods.Year);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("IMDB Rating: " + theGoods.imdbRating);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Produced in: " + theGoods.Country);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Language: " + theGoods.Language);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Plot: " + theGoods.Plot);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Cast: " + theGoods.Actors);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Rotten Tomatoes Rating: " + theGoods.Ratings[1].Value);
			  	console.log("~~~~~~~~~~~~~")
			  };//end of nested conditional
			});//end of default omdb query
		} else {
			request("http://www.omdbapi.com/?t="+newQuery, function (error, response, body) {
			  if (error) {
			  	console.log('error:', error);
			  } else if (response.statusCode === 200) {
			  	var theGoods = JSON.parse(body)
				console.log("Here's the info for the movie you searched for: ");
			  	console.log("Movie Title: " + theGoods.Title);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Released: " + theGoods.Year);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("IMDB Rating: " + theGoods.imdbRating);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Produced in: " + theGoods.Country);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Language: " + theGoods.Language);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Plot: " + theGoods.Plot);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Cast: " + theGoods.Actors);
			  	console.log("~~~~~~~~~~~~~")
			  	console.log("Rotten Tomatoes Rating: " + theGoods.Ratings[1].Value);
			  	console.log("~~~~~~~~~~~~~")
			  }//end of nested conditonal 2
			});//end of omdb query that takes node input
		};//end of conditonal
	},//end of movie-this

	"runThisScript": function() {
		//this takes in our arguments from node, then decides which function to run
		switch (nodeArgs[2].toLowerCase()) {
			case "my-tweets": 
				Liri["my-tweets"]();
				break;
			case "spotify-this-song":
				Liri["spotify-this-song"]();
				break;
			case "movie-this":
				Liri["movie-this"]();
				break;
			case "do-what-it-says":
				Liri["do-what-it-says"]();
				break;
			case "make-query":
				Liri["make-query"]();
				break;
		};//end of switch
	},// end of runThisScript

	//Boy did I hate trying to get this to work :O)
	//Switches our nodeArgs with the content of random.txt
	"do-what-it-says": function() {
		fs.readFile('./random.txt', "utf8", function read(err, data) {
			//if we don't write the following without the spaces, 
			//node won't recognize the arguments :O)
			//I just realized .trim() is not just a jQuery function :O) but I'm not going to use it.
			nodeArgs = "node,liri.js," + data;
			nodeArgs = nodeArgs.split(",");
			Liri.runThisScript();
		});//end of readFile
	}//end of do-what-it-says
};//end of Liri object :o) and they all lived happily ever after the end

Liri["runThisScript"]();