(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('ActionPanelCtrl', ActionPanelCtrl);

    function ActionPanelCtrl($scope, stateManager) {

        var vm = this,
            baseChorePay = 2;

        // Properties
        vm.chorePay = 0;

        // Methods
        vm.clickChores = clickChores;
        vm.clickStudy = clickStudy;

        init();

        function init() {
            $scope.$watch('live.grade.letter', setChorePay);
        }

        function clickChores() {
            stateManager.increment('money', vm.chorePay);
        }

        function clickStudy() {
            stateManager.increment('grade.decimal', 0.05);
        }

        function setChorePay(letterGrade) {
            switch (letterGrade) {
                case 'A':
                    vm.chorePay = baseChorePay * 2;
                    break;
                case 'B':
                    vm.chorePay = baseChorePay;
                    break;
                case 'C':
                    vm.chorePay = baseChorePay / 2;
                    break;
                default:
                    vm.chorePay = 0;
            }
        }

    }

}());
