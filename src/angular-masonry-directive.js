(function() {
    "use strict";

    angular.module('masonry', ['ng']).directive('masonry', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, elem, attrs) {
                var container = elem[0];
                var options = angular.extend({
                    itemSelector: '.item'
                }, angular.fromJson(attrs.masonry));

                var masonry = scope.masonry = new Masonry(container, options);

                scope.update = function() {
                    masonry.reloadItems();
                    masonry.layout();
                    elem.children(options.itemSelector).css('visibility', 'visible');
                };

                scope.removeBrick = function() {
                    $timeout(function() {
                        masonry.reloadItems();
                        masonry.layout();
                    }, 500);
                };

                scope.appendBricks = function(ele) {
                    masonry.appended(ele);
                };

                scope.$on('masonry.layout', function() {
                    masonry.layout();
                });

                // wait until images have finished loading for the elements and then update
                var imgLoad = imagesLoaded(document.querySelectorAll(options.itemSelector));
                imgLoad.on('always', function (instance) {
                    scope.update();
                });
            }
        };
    }).directive('masonryTile', function() {
        return {
            restrict: 'AC',
            link: function(scope, elem) {
                elem.css('visibility', 'hidden');
                var master = elem.parent('*[masonry]:first').scope(),
                    update = master.update,
                    removeBrick = master.removeBrick,
                    appendBricks = master.appendBricks;
                if (update) {
                    imagesLoaded( elem.get(0), update);
                    elem.ready(update);
                }
                if (appendBricks) {
                    imagesLoaded( elem.get(0), appendBricks(elem));
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
