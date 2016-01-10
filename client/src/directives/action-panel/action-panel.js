(function () {
    'use strict';

    angular
        .module('farmApp')
        .directive('actionPanel', actionPanel);

    function actionPanel() {
        return {
            controller: 'ActionPanelCtrl',
            controllerAs: 'actionPanel',
            restrict: 'E',
            templateUrl: '/directives/action-panel/action-panel.html'
        };
    }

}());
