(function() {
    'use strict';

    angular.module('FilmModule')

    .controller('FilmsController', function($scope, Film, films) {

        var initViewWithContent = function() {
            $scope.films = films;
        };

        $scope.$on('$ionicView.loaded', function() {
            initViewWithContent();
        });

    });

})();