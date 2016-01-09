(function () {
    'use strict';

    angular
        .module('farmApp')
        .directive('goalPanel', goalPanel);

    function goalPanel() {
        return {
            controller: 'GoalPanelCtrl',
            controllerAs: 'goalPanel',
            restrict: 'E',
            templateUrl: '/directives/goal-panel/goal-panel.html'
        };
    }

}());
