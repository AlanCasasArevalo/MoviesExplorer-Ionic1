(function() {
    'use strict';

    angular.module('FilmModule')

    .controller('FilmDetailController', function($scope, FilmsService, currentFilmIndex) {

        $scope.data = {};
        $scope.data.films = FilmsService.films;

        var initViewWithContent = function() {
            $scope.currentFilmPage = currentFilmIndex;
        };


        var setupSlider = function() {
            $scope.data.sliderOptions = {
                initialSlide: currentFilmIndex,
                direction: 'horizontal',
                speed: 300,
                grabCursor: true
            };
            $scope.data.sliderDelegate = null;

            $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
                if (newVal != null) {
                    $scope.data.sliderDelegate.on('slideChangeEnd', function() {
                        $scope.data.currentFilmPage = $scope.data.sliderDelegate.activeIndex;
                        $scope.$apply();
                    });
                }
            });
        };

        $scope.$on('$ionicView.loaded', function() {
            initViewWithContent();
        });

        setupSlider();
    });

})();