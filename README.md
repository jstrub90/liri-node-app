# liri-node-app
This app will take in user inputed commands in order to find concert, song, or movie data using API calls via node.js.
### How to Use
To run the app, start by running the code "node liri.js". Once the app is loaded, you can find the information you would like to look up by using the commands below.
![liri](https://user-images.githubusercontent.com/44929958/52833452-a7d77680-30aa-11e9-894b-2c8157b91498.JPG)
**concert-this**:\
Once the app is loaded you can run the command "concert-this <artist/band name>" to find info on upcoming show dates and locations of the artist or band. In this case we are using the app to look up concert info for Post Malone
![concert-this](https://user-images.githubusercontent.com/44929958/52833463-c63d7200-30aa-11e9-8c0d-cef27911323f.JPG)
**spotify-this**:\
This next command will give you information on a song using the spotify api. Simply type in the command "spotify-this-song <song name>". In this case we looked up the data for "Wish you were Here" by Pink Floyd.
![spotify-this](https://user-images.githubusercontent.com/44929958/52833479-db1a0580-30aa-11e9-9634-3fcde5862da8.JPG)
**movie-this**:\ 
The "movie-this <movie-name>" is using the OMDB api to find data on the movie that is provided in the search command. In this case, we pulled the data for the movie "The Dark Knight".
![movie-this](https://user-images.githubusercontent.com/44929958/52833502-f1c05c80-30aa-11e9-80a2-ed093992873a.JPG)
### APIs
* http://www.artists.bandsintown.com/bandsintown-api/?locale=en
* https://developer.spotify.com/documentation/web-api/
* http://www.omdbapi.com/
