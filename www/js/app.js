(function() {
    var app = angular.module('starter', ['ionic', 'starter.controllers']);

    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'js/app/menu/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.about', {
            url: '/about',
            views: {
                'content': {
                    templateUrl: '../js/app/main/about.html'
                }
            }
        })

        .state('app.films', {
            url: '/films',
            views: {
                'content': {
                    templateUrl: '../js/app/films/films.html'
                }
            }
        })

        .state('app.film-detail', {
            url: '/film-detail',
            views: {
                'content': {
                    templateUrl: '../js/app/films/film-detail.html'
                }
            }
        });

        $urlRouterProvider.otherwise('/app/about');
    });
})();