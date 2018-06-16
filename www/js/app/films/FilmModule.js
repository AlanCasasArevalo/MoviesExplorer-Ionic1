(function() {
    'use strict';

    angular.module('FilmModule', ['FilmModel', 'OMDBFilmsModule'])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app.films', {
                url: '/films',
                views: {
                    'content': {
                        templateUrl: '../js/app/films/Films/films.html',
                        controller: 'FilmsController',
                        resolve: {
                            films: function(FilmsService) {
                                return FilmsService.getAllFilms();
                            }
                        }
                    }
                }
            })

            .state('app.film-detail', {
                url: '/films/film-detail/:filmTitle',
                views: {
                    'content': {
                        templateUrl: '../js/app/films/FilmDetail/film-detail.html',
                        controller: 'FilmDetailController',
                        resolve: {
                            currentFilmIndex: function(FilmsService, $stateParams) {
                                return FilmsService.getPositionByTitle($stateParams.filmTitle);
                            }
                        }
                    }
                }
            });

        });

})();