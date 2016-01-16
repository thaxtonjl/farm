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
            if (stateManager.get('grade.letterPlus') === 'A+') {
                stateManager.increment('grade.stats.startAPlus');
                if (stateManager.get('grade.stats.startAPlus') === 10) {
                    stateManager.set('perks.academicExcellence2', true);
                    console.log('perks.academicExcellence2');
                }
            }
            stateManager.increment('grade.decimal', getGradeIncrement());
            if (stateManager.get('grade.letterPlus') === 'A+') {
                stateManager.increment('grade.stats.endAPlus');
                stateManager.set('perks.academicExcellence1', true);
                if (stateManager.get('grade.stats.endAPlus') === 1) {
                    stateManager.set('perks.academicExcellence1', true);
                    console.log('perks.academicExcellence1');
                }
            }
        }

        function getGradeIncrement() {
            var increment = 0.05;
            var bonus = 1.25;
            if (stateManager.get('perks.academicExcellence1')) {
                increment *= bonus;
            }
            if (stateManager.get('perks.academicExcellence2')) {
                increment *= bonus;
            }
            return increment;
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
