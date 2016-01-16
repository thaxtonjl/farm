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
                    stateManager.increment('perks.academicExcellence');
                    console.log('perks.academicExcellence: 2');
                }
            }
            var letterGrade = stateManager.get('grade.letter');
            if (letterGrade === 'A') {
                stateManager.increment('grade.stats.startAStreak');
                stateManager.increment('grade.stats.startABStreak');
            } else if (letterGrade === 'B') {
                stateManager.set('grade.stats.startAStreak', 0);
                stateManager.increment('grade.stats.startABStreak');
            } else {
                stateManager.set('grade.stats.startAStreak', 0);
                stateManager.set('grade.stats.startABStreak', 0);
            }
            var osmoticLearner = stateManager.get('perks.osmoticLearner') || 0;
            if (osmoticLearner === 0 && stateManager.get('grade.stats.startABStreak') === 20) {
                increaseOsmoticLearner();
                console.log('perks.osmoticLearner: 1');
            }
            if (osmoticLearner === 1 && stateManager.get('grade.stats.startAStreak') === 50) {
                increaseOsmoticLearner();
                console.log('perks.osmoticLearner: 2');
            }
            stateManager.increment('grade.decimal', getGradeIncrement());
            if (stateManager.get('grade.letterPlus') === 'A+') {
                stateManager.increment('grade.stats.endAPlus');
                stateManager.set('perks.academicExcellence1', true);
                if (stateManager.get('grade.stats.endAPlus') === 1) {
                    stateManager.increment('perks.academicExcellence');
                    console.log('perks.academicExcellence: 1');
                }
            }

            function increaseOsmoticLearner() {
                var gradeRest = stateManager.get('grade.rest') * 1.183;
                stateManager.set('grade.rest', gradeRest);
                stateManager.set('grade.decimal', null, {min: gradeRest});
                stateManager.increment('perks.osmoticLearner');
            }

        }

        function getGradeIncrement() {
            var academicExcellence = stateManager.get('perks.academicExcellence') || 0;
            return 0.05 * Math.pow(1.25, academicExcellence);
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
