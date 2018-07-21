// My unique Twitter username (please change it to your username for testing)
var myTwitterUserName = 'dzbootcamper';


// Link in Node Packages
var fs = require('fs'); // Included with Node.js --> Read/Write files
var request = require('request'); // https://www.npmjs.com/package/request --> API request client
var spotify = require('spotify'); // https://www.npmjs.com/package/spotify --> Spotify API client library
var Twitter = require('twitter'); // https://www.npmjs.com/package/twitter --> Twitter API client library


// Link in API Keys for Twitter
var apiKeys = require('./keys.js');

var client = new Twitter({
  consumer_key: apiKeys.twitterKeys.consumer_key,
  consumer_secret: apiKeys.twitterKeys.consumer_secret,
  access_token_key: apiKeys.twitterKeys.access_token_key,
  access_token_secret: apiKeys.twitterKeys.access_token_secret
});

var params = {
    screen_name: myTwitterUserName,
    count: 20
};



// Collect the User Command Tyoe
var command = process.argv[2];


// Collect the User Command String
var commandString = "";
for(var i = 3; i < process.argv.length; i++){
  commandString += process.argv[i] + " ";
}
// Remove the last space
commandString = commandString.trim();




// -------- Log Inputs-----------

// Variable to log every input (good or bad) into log.txt
var addToLog = "node liri.js ";

// Loop through all of process.argv
for(var i = 2; i < process.argv.length; i++){
  addToLog += process.argv[i] + " ";
}
addToLog = addToLog.substring(0, addToLog.length - 1);

// Append the log to the txt file (with a line break)
fs.appendFile("log.txt", addToLog + '\n', function(err) {
  
//error handling for log
    if(err){
    console.log('Error in user logging: ' + err);
  }

});

// Switch case for the User Command Types
switch(command){

  // Twitter
  case 'my-tweets':
    callTwitter();
    break;


  // Spotify
  case 'spotify-this-song':
    callSpotify(commandString);
    break;


  // OMBD
  case 'movie-this':
    callMovieRequest(commandString);
    break;


  // FS Read
  case 'do-what-it-says':
    callWhatItSays();
    break;


  // Invalid Entry
  default:

    // Skip a line in console
    console.log('');

    // Prompt Message
    var userPrompt = 'Please pass in a valid LIRI command type...' + '\n' + 'Ex: "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"';
    
    // Show message in console
    console.log(userPrompt);

    // Append to log
    fs.appendFile("log.txt", userPrompt + '\n\n\n', function(err) {
      if(err){
        console.log('Error in output logging: ' + err);
      }
    });



}

// Twitter Function --------------------------------
function callTwitter(){

  console.log('');

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    
    // Check for error
    if(error) throw error;
    
    var displayTweets = ""; 
    for(var i = 0; i < tweets.length; i++){
      var currentTweet = "Tweet " + (i+1) + ": " + '\n' + tweets[i].text;

      console.log(currentTweet);
      console.log('');

      //Log Variable
      displayTweets += currentTweet + '\n';
    }

    // log
    fs.appendFile("log.txt", displayTweets + '\n\n', function(err) {
      if(err){
        console.log('Error in output logging: ' + err);
      }
    });

  });

}

// Spotify Function ---------------------------------------------
function callSpotify(userInput){

  console.log('');

  var songName;
  if(userInput == ""){
    // default if blank
    songName = "Hypnotize"; 
  }
  else{
    songName = userInput;
  }


  // Spotify request
  spotify.search({ type: 'track', query: songName }, function(err, data) {

    if ( err ) {
      console.log('Error occurred: ' + err);
      return;
    }
    else{
      var displaySpotify = "";

      // Song Name Display
      var displaySong = 'Track Name: ' + data.tracks.items[0].name;
      displaySpotify += displaySong + '\n';

      // Artist Display -- loop through all artists
      var artists = "";
      for(var i = 0; i < data.tracks.items[0].artists.length; i++){
        artists += data.tracks.items[0].artists[i].name + ", ";
      }
      artists = artists.substring(0,artists.length - 2); 
      var displayArtists = 'Artist Name(s): ' + artists;
      displaySpotify += displayArtists + '\n';


      // Album Display
      var displayAlbum = 'Album Name: ' + data.tracks.items[0].album.name;
      displaySpotify += displayAlbum + '\n';


      // Preview Display
      var displayURL = 'Preview Song URL: ' + data.tracks.items[0].preview_url;
      displaySpotify += displayURL + '\n';


      // Display Spotify Ouput
      console.log(displaySpotify);


      // Add to log
      fs.appendFile("log.txt", displaySpotify + '\n\n', function(err) {
        if(err){
          console.log('Error in output logging: ' + err);
        }
      });


    }

  });

}

// OMDB Request Function
function callMovieRequest(userInput){

  // Skip a line in console
  console.log('');


  // Test if a move name was passed into LIRI
  var movieName;
  if(userInput == ""){
    // If nothing is specified, search a default movie
    movieName = "Mr.+Nobody";
  }
  else{
    // If there is an input, then collect it and remove any spaces
    movieName = userInput.replace(/ /g, "+");
  }


  // Create a request URL to the OMDB API with the movie specified (include full plot and rotten tomatoes)
  var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&plot=full&tomatoes=true&r=json';

  // Use the Request Node Package to pull from the OMDB API
  request(queryUrl, function (error, response, body) {

    // Successful Query
    if (!error && response.statusCode == 200) {

      // Create a display variable
      var displayIMDB = "";

      // Display Title
      var displayTitle = "Title: " + JSON.parse(body)["Title"];
      displayIMDB += displayTitle + '\n';

      // Display Year
      var displayYear = "Year: " + JSON.parse(body)["Year"];
      displayIMDB += displayYear + '\n';

      // Display Age Rating
      var displayAge = "Rated: " + JSON.parse(body)["Rated"];
      displayIMDB += displayAge + '\n';

      // Display IMDB Rating
      var displayRating = "IMDB Rating: " + JSON.parse(body)["imdbRating"];
      displayIMDB += displayRating + '\n';

      // Display Country where produced
      var displayCountry = "Country of Production: " + JSON.parse(body)["Country"];
      displayIMDB += displayCountry + '\n';

      //Display Language of movie
      var displayLanguage = "Language: " + JSON.parse(body)["Language"];
      displayIMDB += displayLanguage + '\n';

      // Display Plot of movie
      var displayPlot = "Plot: " + JSON.parse(body)["Plot"];
      displayIMDB += displayPlot + '\n';

      // Display Actors in movie
      var displayActors = "Actors: " + JSON.parse(body)["Actors"];
      displayIMDB += displayActors + '\n';

      // Display Rotten Tomatoes Rating (Critic)
      var displayTomatoCritic = "Rotten Tomatoes Rating (Critics): " + JSON.parse(body)["tomatoRating"];
      displayIMDB += displayTomatoCritic + '\n';

      // Display Rotten Tomatoes Rating (Users)
      var displayTomatoUser = "Rotten Tomatoes Rating (Users): " + JSON.parse(body)["tomatoUserRating"];
      displayIMDB += displayTomatoUser + '\n';

      // Display Rotten Tomatoes URL
      var displayTomatoURL = "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"];
      displayIMDB += displayTomatoURL + '\n';



      // Display everything to the user
      console.log(displayIMDB);



      // Append to log
      fs.appendFile("log.txt", displayIMDB + '\n\n', function(err) {
        if(err){
          console.log('Error in output logging: ' + err);
        }
      });


    }
    // Unsucessful Query
    else{
      console.log('Error occurred: ' + error);
    }

  });

}

// Bonus (Do What It Says) Function
function callWhatItSays(){

  // Read from the random.txt file
  fs.readFile("random.txt", "utf8", function(error, data) {

    // Split the text into a command type and input
    var dataArr = data.split(",")
    var randomcommand = dataArr[0];
    var randomCommandString = dataArr[1];

    // Display the call to the user
    console.log('');
    var randomCall = 'Running Command: ' + randomcommand + ' ' + randomCommandString;
    console.log(randomCall);

    // Append to log
    fs.appendFile("log.txt", randomCall + '\n', function(err) {
      if(err){
        console.log('Error in output logging: ' + err);
      }
    });


    // Switch case to determine which function to call
    switch(randomcommand){

      // Twitter
      case 'my-tweets':
        callTwitter();
        break;


      // Spotify
      case 'spotify-this-song':
        callSpotify(randomCommandString);
        break;


      // OMBD (Request)
      case 'movie-this':
        callMovieRequest(randomCommandString);
        break;


      // Default
      default:

      // Create an error message for the user
      var userPrompt = 'Sorry! Something is wrong with the "random.txt" file.' + '\n' + 'Use your imagination to come up with a LIRI command.';
      
      // Show message in console
      console.log('');
      console.log(userPrompt);

      // Append to log
      fs.appendFile("log.txt", userPrompt + '\n\n\n', function(err) {
        if(err){
          console.log('Error in output logging: ' + err);
        }
      });

    }

  });

}