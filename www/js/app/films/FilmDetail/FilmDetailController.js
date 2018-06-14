(function() {
    'use strict';

    angular.module('FilmModule')

    .controller('FilmDetailController', function($scope, Film) {
        var initViewWithContent = function() {
            $scope.film = Film.build({ "Title": "The Martian", "Year": "2015", "Rated": "PG-13", "Released": "02 Oct 2015", "Runtime": "144 min", "Genre": "Adventure, Drama, Sci-Fi", "Director": "Ridley Scott", "Writer": "Drew Goddard (screenplay by), Andy Weir (based on the novel by)", "Actors": "Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels", "Plot": "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.", "Language": "English, Mandarin", "Country": "UK, USA", "Awards": "Nominated for 7 Oscars. Another 37 wins & 185 nominations.", "Poster": "https://ia.media-imdb.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.0/10" }, { "Source": "Rotten Tomatoes", "Value": "91%" }, { "Source": "Metacritic", "Value": "80/100" }], "Metascore": "80", "imdbRating": "8.0", "imdbVotes": "617,899", "imdbID": "tt3659388", "Type": "movie", "DVD": "12 Jan 2016", "BoxOffice": "$202,313,768", "Production": "20th Century Fox", "Website": "http://TheMartianMovie.com", "Response": "True" });
        };

        $scope.$on('$ionicView.loaded', function() {
            initViewWithContent();
        });
    });

})();