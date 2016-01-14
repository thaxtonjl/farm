(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('GoalPanelCtrl', GoalPanelCtrl);

    function GoalPanelCtrl($scope) {

        var vm = this;

        // Properties
        vm.moneyGoal = 100;

        // Methods
        vm.percentageOfMoneyGoal = percentageOfMoneyGoal;

        function percentageOfMoneyGoal() {
            return (Math.min($scope.live.money, vm.moneyGoal) * 100 / vm.moneyGoal).toFixed(4);
        }

    }

}());
