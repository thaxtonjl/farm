(function () {
    'use strict';

    angular
        .module('farmApp')
        .directive('mapTile', mapTile);

    function mapTile() {

        return {
            bindToController: {
                altColor: '=',
                options: '='
            },
            controller: 'MapTileCtrl',
            controllerAs: 'mapTile',
            link: mapTileLink,
            restrict: 'E',
            scope: {},
            templateUrl: '/directives/map-tile/map-tile.html'
        };

        function mapTileLink($scope, el, attrs, ctrl) {
            if (ctrl.altColor) {
                el.addClass('map-tile-alt-color');
            }
            if (ctrl.active) {
                el.addClass('map-tile-active');
            }
        }

    }

}());
