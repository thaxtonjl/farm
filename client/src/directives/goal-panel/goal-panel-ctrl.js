(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('GoalPanelCtrl', GoalPanelCtrl);

    function GoalPanelCtrl() {

        var vm = this;

        this.moneyGoal = 100;

    }

}());
