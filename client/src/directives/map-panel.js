(function () {
    'use strict';

    angular
        .module('farmApp')
        .directive('mapPanel', mapPanel);

    function mapPanel() {
        return {
            controller: 'MapPanelCtrl',
            controllerAs: 'mapPanel',
            restrict: 'A',
            templateUrl: '/directives/map-panel.html'
        };
    }

}());
