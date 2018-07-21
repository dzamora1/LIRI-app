# LIRI-app
Liri node.js app for homework assignment

L.I.R.I. (Language Interpretation and Recognition Interface) is a command line node app that takes in parameters and gives back data from APIs.

The LIRI app uses Node.js in the command line of your computer. Request, spotify, and twitter Node packages are needed to run the app. The fs package is also used to write to text files.

Types of commands are listed below...

my-tweets returns your Twitter account's 20 most recent tweets using the Twitter API.
spotify-this-song [song-title-here] returns the artist, album, and preview URL for a specific song using the Spotify API.
movie-this [movie-title-here] returns the year, rating, plot summary, reviews of a specific movie using the OMDB  API.
do-what-it-says returns the result of a "random" result by reading the random.txt file and performing the command written in that file. This command can be changed to any one of the 3 types listed above.

Instructions
This is a command line application and must be cloned down to your machine to be demoed. After cloning down the repo to your computer, cd into the liri-node-app folder and run npm install to download all the node dependencies mentioned above.

Once installed...

You will need the Twitter API to demo this functionality
You will need to get API keys for Twitter. The Twitter Apps page will tell you how to get a consumer_key, consumer_secret, access_token_key, and access_token_secret. You can also see the npm page for more information.
Once you have the needed API keys, open the keys.js file and paste them into the correpsonding locations in the exports.twitterKeys object.
You will also need to change the liri.js file and change the myTwitterUserName variable to your twitter handle.
Note** that the Spotify API and OMDB do not need special keys, so you can run the app with minimal setup if you wish to skip over the Twitter API functionality.
To run the app, simply use the node liri.js [command-here].
Be sure that you cd into the liri-node-app folder before running the commands.

Twitter API
Running the command node liri.js my-tweets will return my 20 most recent tweets. Twitter Command

Spotify API
Running the command node liri.js spotify-this-song "Bohemian Rhapsody" will return the track info from Spotify. Spotify Command

OMDB API
Running the command node liri.js movie-this Pulp Fiction will return the movie info from OMDB . OMDB  Command

Node fs file reader
Running the command node liri.js do-what-it-says will read a command out of the random.txt file and perform it. Random Command

When this is used, the log.txt file contians the command to Spotify the song "I Want It That Way". The log.txt file can be changed to perform any of the 3 types of commands listed above.
Error Handling
If the LIRI inputs are incomplete, the user will be prompted with a list of possible commands. Missing Command
