(function() {
    'use strict';

    angular.module('OMDBFilmsModule', ['FilmModel'])

    .constant('filmNames', [
        'the Martian',
        'interstellar',
        'Book Club',
        'Hereditary',
        'Hotel Artemis',
        'Upgrade',
        'Solo: A Star Wars Story',
        'Deadpool 2'
    ])

    .constant('omdbAPi', (function() {
        var namePlaceholder = ['namePlaceholder'];

        return {
            url: 'http://www.omdbapi.com/?t=' + namePlaceholder + '&y=&plot=short&r=json',
            namePlaceholder: namePlaceholder
        };

    })())

    .factory('FilmsService', function($http, $q, Film, filmNames, omdbAPi) {

        var filmsService = {};

        filmsService.films = [];

        filmsService.selectedFilm = null;

        var urlFromTitle = function(title) {
            var titleQueryString = title.split(' ').join('+');
            var url = omdbAPi.url.replace(omdbAPi.namePlaceholder, titleQueryString);
            return url;
        };

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
                $http.get(urlFromTitle(title), {}).then(function(success) {
                    filmsService.selectedFilm = Film.build(response.data);
                    deferred.resolve(this.filmsService.selectedFilm);
                }, function(error) {
                    filmsService.selectedFilm = null;
                    deferred.resolve(null);
                });
            }

            return deferred.promise;
        };

        filmsService.getAllFilms = function() {
            var deferred = $q.defer();

            if (filmsService.films.length > 0) {
                deferred.resolve(filmsService.films);
            } else {

                var numberOfDownloads = 0;
                var someErrorOccured = false;
                var resolveIfFinished = function(success) {
                    numberOfDownloads++;
                    if (!success) {
                        someErrorOccured = true;
                    }
                    if (numberOfDownloads === filmNames.length) {
                        if (!someErrorOccured) {
                            deferred.resolve(filmsService.films);
                        } else {
                            deferred.reject();
                        }
                    }
                };

                for (var index = 0; index < filmsService.films.length; index++) {
                    $http.get(urlFromTitle(filmNames[index], {}).then(
                        function(response) {
                            filmsService.films.push(Film.build(response.data));
                            resolveIfFinished(true);
                        },
                        function(error) {
                            resolveIfFinished(false);
                        }));
                }
            }
        };

        return filmsService;
    });

})();