(function() {
    'use strict';

    angular.module('FilmModule')

    .controller('FilmsController', function($scope, Film) {

        var initViewWithContent = function() {
            var film1 = Film.build({ "Title": "The Martian", "Year": "2015", "Rated": "PG-13", "Released": "02 Oct 2015", "Runtime": "144 min", "Genre": "Adventure, Drama, Sci-Fi", "Director": "Ridley Scott", "Writer": "Drew Goddard (screenplay by), Andy Weir (based on the novel by)", "Actors": "Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels", "Plot": "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.", "Language": "English, Mandarin", "Country": "UK, USA", "Awards": "Nominated for 7 Oscars. Another 37 wins & 185 nominations.", "Poster": "https://ia.media-imdb.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.0/10" }, { "Source": "Rotten Tomatoes", "Value": "91%" }, { "Source": "Metacritic", "Value": "80/100" }], "Metascore": "80", "imdbRating": "8.0", "imdbVotes": "617,899", "imdbID": "tt3659388", "Type": "movie", "DVD": "12 Jan 2016", "BoxOffice": "$202,313,768", "Production": "20th Century Fox", "Website": "http://TheMartianMovie.com", "Response": "True" });
            var film2 = Film.build({ "Title": "Blade Runner", "Year": "1982", "Rated": "R", "Released": "25 Jun 1982", "Runtime": "117 min", "Genre": "Sci-Fi, Thriller", "Director": "Ridley Scott", "Writer": "Hampton Fancher (screenplay), David Webb Peoples (screenplay), Philip K. Dick (novel)", "Actors": "Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos", "Plot": "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.", "Language": "English, German, Cantonese, Japanese, Hungarian, Arabic", "Country": "USA, Hong Kong", "Awards": "Nominated for 2 Oscars. Another 11 wins & 16 nominations.", "Poster": "https://ia.media-imdb.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.2/10" }, { "Source": "Rotten Tomatoes", "Value": "90%" }, { "Source": "Metacritic", "Value": "89/100" }], "Metascore": "89", "imdbRating": "8.2", "imdbVotes": "583,975", "imdbID": "tt0083658", "Type": "movie", "DVD": "27 Aug 1997", "BoxOffice": "N/A", "Production": "Warner Bros. Pictures", "Website": "N/A", "Response": "True" });

            $scope.films = [film1, film2];
        };

        $scope.$on('$ionicView.loaded', function() {
            initViewWithContent();
        });

    });

})();