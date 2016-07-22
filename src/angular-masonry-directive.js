(function() {
    "use strict";

    angular.module('masonry', ['ng']).directive('masonry', ['$timeout', function ($timeout) {
        return {
            restrict: 'AC',
            scope: {},
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                var container = $element[0];
                var options = angular.extend({
                    itemSelector: '.item'
                }, angular.fromJson($attrs.masonry));

                var masonry = $scope.masonry = new Masonry(container, options);

                var debounceTimeout = 0;
                this.update = function() {
                    if (debounceTimeout) {
                        $timeout.cancel(debounceTimeout);
                    }
                    debounceTimeout = $timeout(function() {
                        debounceTimeout = 0;

                        masonry.reloadItems();
                        masonry.layout();

                        $element.children(options.itemSelector).css('visibility', 'visible');
                    }, 120);
                };

                this.removeBrick = function() {
                    $timeout(function() {
                        masonry.reloadItems();
                        masonry.layout();
                   }, 500);
                };

                this.appendBricks = function(ele) {
                    masonry.appended(ele);
                };

                $scope.$on('masonry.layout', function() {
                    masonry.layout();
                });

                this.update();

                $scope.$on('ngMasonry.update', function () {
                    this.update();
                });

                $scope.$on('ngMasonry.removeBrick', function () {
                    this.removeBrick();
                });

                $scope.$on('ngMasonry.appendBricks', function (el) {
                    this.appendBricks(el);
                });
            }]
        };
    }]).directive('masonryTile', function() {
        return {
            restrict: 'AC',
            require:'^masonry',
            link: function(scope, elem, attrs, masonryCtrl) {
                elem.css('visibility', 'hidden');
                var master = elem.parent('*[masonry]:first').scope(),
                    update = masonryCtrl.update,
                    removeBrick = masonryCtrl.removeBrick,
                    appendBricks = masonryCtrl.appendBricks;
                if (update) {
                    imagesLoaded(elem.get(0), update);
                    elem.ready(update);
                }
                if (appendBricks) {
                    imagesLoaded(elem.get(0), appendBricks(elem));
                }
                scope.$on('$destroy', function() {
                    if (removeBrick) {
                        removeBrick();
                    }
                });
            }
        };
    });
})();
