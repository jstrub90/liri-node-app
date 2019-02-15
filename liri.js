require("dotenv").config();

let keys = require("./keys.js"),
    Spotify = require('node-spotify-api'),
    spotify = new Spotify(keys.spotify),
    axios = require("axios"),
    moment = require("moment"),
    inquirer = require('inquirer'),
    fs = require('fs'); 

    const runCommand = (userCommand, commandInfo) => {
    switch (userCommand){
        case 'concert-this':
            logIt(userCommand + ' ' + commandInfo);
            concertThis(commandInfo);
            break;
        case 'spotify-this-song':
            logIt(userCommand + ' ' + commandInfo);
            spotifyThis(commandInfo);
            break;
        case 'movie-this':
            logIt(userCommand + ' ' + commandInfo);
            movieThis(commandInfo);
            break;
        case 'do-what-it-says':
            logIt(userCommand + ' ' + commandInfo);
            doThis(commandInfo);
            break;
        default:
            console.log("I don't understand your request, please enter a valid command.");
            logIt(userCommand + ' ' + commandInfo);
            logIt("I don't understand your request, please enter a valid command.");
            break;
    }
}

const concertThis = artist => {
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            let events = response.data;
            let output = "";
            for (let i = 0; i < events.length; i++) {
                let {venue, datetime} = events[i];
                output += "Venue: " + venue.name + "\n" +
                            "Location: " + venue.city + ", " + venue.country + "\n" +
                            "Date: " + moment(events[i].datetime).format("MM/DD/YYYY") + "\n" +
                            "------------------------------" + "\n";
            }
            console.log(output);
            logIt(output);
        }
    );
}
const spotifyThis = song => {
    let query = song != "" ? song : "The Sign";
    spotify.search({ type: 'track', query: query, limit: 1 })
        .then(function(response) {
            let {artists, name, preview_url, album} = response.tracks.items[0];
            let output = "Artist: " + artists[0].name + "\n" +
                        "Song Title: " + name + "\n" +
                        "Preview: " + preview_url + "\n" +
                        "Album: " + album.name;

            console.log(output);
            logIt(output);
        })
        .catch(function(err) {
            console.log(err);
    });
}
const movieThis = movie => {
    let query = movie != "" ? movie : "Mr. Nobody";
    let queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            let {Title, Year, Ratings, Country, Language, Plot, Actors} = response.data;
            let output = "Movie Title: " + Title + "\n" +
                        "Year Released: " + Year + "\n" +
                        "IMDB Rating: " + Ratings[0].Value + "\n" +
                        "Rotten Tomatoes Rating: " + Ratings[1].Value + "\n" +
                        "Country: " + Country + "\n" +
                        "Movie Language: " + Language + "\n" +
                        "Plot: " + Plot + "\n" +
                        "Actors: " + Actors;

            console.log(output);
            logIt(output);
        }
    );
}
const doThis = () => {
    fs.readFile("random.txt", "utf8", function(err, data){
        let info = data.split(", ");
        runCommand(info[0], info[1]);
    });
}
const logIt = (log) => {
    fs.appendFile('log.txt', log + '\r\n', (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Log file updated!");
        }
    });
}

inquirer.prompt([
    {
        type: "input",
        name: "command",
        message: "Hi there I'm LIRI, what can I do for you?"
    }
])
.then(function(response) {
    let userInput = response.command.split(' '),
        userCommand = userInput.shift(),
        commandInfo = userInput.join(' ');

    runCommand(userCommand, commandInfo);
});
