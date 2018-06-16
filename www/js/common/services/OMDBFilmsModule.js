(function() {
    'use strict';

    angular.module('OMDBFilmsModule', ['FilmModel', 'StorageModule'])

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
        var namePlaceholder = '[namePlaceholder]';

        return {

            url: 'http://www.omdbapi.com/?t=' + namePlaceholder + '&y=&plot=short&r=json&apikey=375f649e',
            namePlaceholder: namePlaceholder
        };

    })())

    .factory('FilmsService', function($http, $q, Film, filmNames, omdbAPi, storageService) {

        var filmsService = {};

        filmsService.films = [];

        filmsService.selectedFilm = null;

        var storedItems = storageService.getItem("films");

        if (storedItems) {
            filmsService.films = Film.fromJsonBunch(storedItems);
        }

        var urlFromTitle = function(title) {
            var titleQueryString = title.split(' ').join('+');
            var url = omdbAPi.url.replace(omdbAPi.namePlaceholder, titleQueryString);
            return url;
        };

        var selectFilmByTitle = function(title) {
            for (var index = 0; index < filmsService.films.length; index++) {
                if (filmsService.films[index].title === title) {
                    return filmsService.films[index];
                }
            }

            return null;
        };

        filmsService.getSpecificFilm = function(title) {
            var deferred = $q.defer();

            if (filmsService.films.length > 0) {
                filmsService.selectedFilm = selectFilmByTitle(title);
                deferred.resolve(filmsService.selectedFilm);
            } else {
                $http.get(urlFromTitle(title, {})).then(
                    function(response) {
                        filmsService.selectedFilm = Film.build(response.data);
                        deferred.resolve(filmsService.selectedFilm);
                    },
                    function(error) {
                        filmsService.selectedFilm = null;
                        deferred.resolve(null);
                    });
            }

            return deferred.promise;
        };

        var selectPositionByTitle = function(title) {
            for (var index = 0; index < filmsService.films.length; index++) {
                if (filmsService.films[index].title === title) {
                    return index;
                }
            }

            return null;
        };

        filmsService.getPositionByTitle = function(title) {
            var deferred = $q.defer();

            if (filmsService.films.length > 0) {
                deferred.resolve(selectPositionByTitle(title));
            } else {
                filmsService.getAllFilms().then(
                    function(response) {
                        deferred.resolve(selectPositionByTitle(title));
                    },
                    function(error) {
                        deferred.resolve(null);
                    }
                );
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

                        storageService.setItem("films", filmsService.films);

                        if (!someErrorOccured) {
                            deferred.resolve(filmsService.films);
                        } else {
                            deferred.reject();
                        }
                    }
                };

                for (var index = 0; index < filmNames.length; index++) {

                    $http.get(urlFromTitle(filmNames[index], {})).then(
                        function(response) {
                            filmsService.films.push(Film.build(response.data));
                            resolveIfFinished(true);
                        },
                        function(error) {
                            resolveIfFinished(false);
                        });

                }
            }

            return deferred.promise;

        };

        return filmsService;
    });

})();