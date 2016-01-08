(function () {
    'use strict';

    angular
        .module('farmApp')
        .directive('mapPanel', mapPanel);

    function mapPanel() {
        return {
            controller: 'MapPanelCtrl',
            controllerAs: 'mapPanel',
            restrict: 'E',
            templateUrl: '/directives/map-panel/map-panel.html'
        };
    }

}());
