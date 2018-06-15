(function() {
    'use strict';

    angular.module('FilmModule')

    .controller('FilmDetailController', function($scope, Film, currentFilmIndex) {

        var initViewWithContent = function() {
            $scope.currentFilmPage = currentFilmIndex;
        };

        $scope.$on('$ionicView.loaded', function() {
            initViewWithContent();
        });
    });

})();