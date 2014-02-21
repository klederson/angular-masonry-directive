(function() {
    "use strict";

    angular.module('masonry', ['ng']).directive('masonry', function($parse) {
        return {
            restrict: 'AC',
            link: function(scope, elem, attrs) {
                scope.items = [];
                var container = elem[0];
                var options = angular.extend({
                    itemSelector: '.item'
                }, JSON.parse(attrs.masonry));

                scope.obj = new Masonry(container, options);
            }
        };
    }).directive('masonryTile', function() {
        return {
            restrict: 'AC',
            link: function(scope, elem) {
                var master = elem.parent('*[masonry]:first').scope();
                var masonry = master.obj;

                elem.ready(function() {
                    masonry.addItems([elem]);
                    masonry.reloadItems();
                    masonry.layout();
                });
            }
        };
    });
})();
