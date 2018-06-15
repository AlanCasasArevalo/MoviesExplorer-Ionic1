(function() {
    'use strict';

    angular.module('OMDBFilmsModule', ['FilmModel'])
        .factory('FilmsService', function($http, Film) {

            var filmsService = {};

            filmsService.films = [];

            filmsService.selectedFilm = null;

            var selecFilmByTitle = function(title) {
                for (var index = 0; index < filmsService.length; index++) {
                    if (filmsService.films[index].title === title) {
                        return filmsService.films[index];
                    }
                }

                return null;
            };

            filmsService.getSpecificFilm = function(title) {
                var deferred = $q.defer();


                if (filmsService.films.length > 0) {
                    filmsService.selectedFilm = selecFilmByTitle(title);
                    deferred.resolve(this.filmsService.selectedFilm);
                } else {
                    $http.get('url', {}).then(function(success) {
                        filmsService.selectedFilm = Film.build(response.data);
                        deferred.resolve(this.filmsService.selectedFilm);
                    }, function(error) {
                        filmsService.selectedFilm = null;
                        deferred.resolve(null);
                    });
                }

                return deferred.promise;
            };

            filmsService.getAllFilms = function() {};

            return filmsService;
        });

})();