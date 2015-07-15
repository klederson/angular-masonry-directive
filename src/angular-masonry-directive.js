(function() {
    "use strict";

    angular.module('masonry', ['ng']).directive('masonry', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, elem, attrs) {
                var container = elem[0];
                var options = {
                    itemSelector: '.item'
                }
                if (attrs.masonry) {
                    angular.extend(options, angular.fromJson(attrs.masonry));
                }

                var masonry = scope.masonry = new Masonry(container, options);

                var debounceTimeout = null;
                scope.updateMasonry = function() {
                    if (debounceTimeout) {
                        $timeout.cancel(debounceTimeout);
                    }
                    debounceTimeout = $timeout(function() {
                        debounceTimeout = null;

                        masonry.reloadItems();
                        masonry.layout();

                        elem.children(options.itemSelector).css('visibility', 'visible');
                    }, 0);
                };

                scope.removeMasonryBrick = function() {
                    $timeout(function() {
                        masonry.reloadItems();
                        masonry.layout();
                   }, 0);
                };

                scope.appendMasonryBrick = function(ele) {
                    masonry.appended(ele);
                };

                scope.$on('masonry.layout', function() {
                    $timeout(function() { masonry.layout(); }, 0);
                });

                scope.$on('$destroy', function() { masonry.destroy(); });

                scope.updateMasonry();
            }
        };
    }]).directive('masonryTile', function() {
        return {
            restrict: 'AC',
            link: function(scope, elem) {
                elem.css('visibility', 'hidden');
                var master = elem.parents('*[masonry]:first').scope(),
                    update = master.updateMasonry,
                    removeBrick = master.removeMasonryBrick,
                    appendBrick = master.appendMasonryBrick;
                if (update) {
                    imagesLoaded( elem.get(0), update);
                    elem.ready(update);
                }
                if (appendBrick) {
                    imagesLoaded( elem.get(0), appendBrick(elem));
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
