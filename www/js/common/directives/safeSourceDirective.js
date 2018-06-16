(function() {
    'use strict';

    angular.module('UtilsModule', [])

    .constant('defaultPhoto', "../../../img/defaultPhoto.png")

    .controller('safeSourceController', ['$scope', function($scope) {
        var img = new Image();
        var currentSrc;

        this.onLoadSuccess = function(callback) {
            img.onload = function() {
                callback(this.src);
            };
        };

        this.onLoadError = function(callback) {
            img.onerror = function(error) {
                callback(error);
            };
        };

        this.updateSource = function(src) {
            if (angular.isDefined(src) && src.length && currentSrc != src) {
                currentSrc = src;
                img.src = currentSrc;
            }
        };
    }])

    .directive('safeSrc', ['defaultPhoto', function(defaultPhoto) {
        return {
            restrict: "A",
            controller: 'safeSourceController',
            scope: {
                safeSrc: '@'
            },
            link: function(scope, element, attrs, safeSourceController) {
                element[0].src = defaultPhoto;

                safeSourceController.onLoadSuccess(function(src) {
                    element[0].src = src;
                });

                safeSourceController.updateSource(scope.safeSrc);

                scope.$watch('safeSrc', function(newVal, oldVal) {
                    safeSourceController.updateSource(scope.safeSrc);
                });
            }
        };
    }])

    .directive('safeBgSrc', ['defaultPhoto', function(defaultPhoto) {
        return {
            restrict: "A",
            controller: 'safeSourceController',
            scope: {
                safeBgSrc: '@'
            },
            link: function(scope, element, attrs, safeSourceController) {
                element.css({
                    'backgroundImage': 'url(' + defaultPhoto + ')'
                });

                safeSourceController.onLoadSuccess(function(src) {
                    element.css({
                        'backgroundImage': 'url(' + src + ')'
                    });
                });

                safeSourceController.updateSource(scope.safeBgSrc);

                scope.$watch('safeBgSrc', function(newVal, oldVal) {
                    safeSourceController.updateSource(scope.safeBgSrc);
                });

            }
        };
    }]);

})();