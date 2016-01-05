(function () {
    'use strict';

    angular
        .module('farmApp')
        .directive('mapTile', mapTile);

    function mapTile() {
        return {
            bindToController: {
                options: '=mapTile'
            },
            controller: 'MapTileCtrl',
            controllerAs: 'mapTile',
            restrict: 'A',
            scope: {},
            templateUrl: '/directives/map-tile.html'
        };
    }

}());
