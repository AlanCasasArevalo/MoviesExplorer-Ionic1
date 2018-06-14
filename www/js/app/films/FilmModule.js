(function() {
    'use strict';

    angular.module('FilmModule', ['FilmModel'])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app.films', {
                url: '/films',
                views: {
                    'content': {
                        templateUrl: '../js/app/films/Films/films.html',
                        controller: 'FilmsController'
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