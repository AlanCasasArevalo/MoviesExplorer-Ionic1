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
                url: '/film-detail',
                views: {
                    'content': {
                        templateUrl: '../js/app/films/FilmDetail/film-detail.html',
                        controller: 'FilmDetailController'
                    }
                }
            });

        });

})();