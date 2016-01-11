(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('GoalPanelCtrl', GoalPanelCtrl);

    function GoalPanelCtrl(stateManager) {

        var vm = this;

        // Properties
        vm.live = stateManager.live;

        // Methods
        vm.getLetterGrade = getLetterGrade;

        function getLetterGrade(grade, plusMinus) {

            var letterGrade;
            grade = Math.round(grade * 100);

            if (grade >= 90) {
                letterGrade = 'A';
            } else if (grade >= 80) {
                letterGrade = 'B';
            } else if (grade >= 70) {
                letterGrade = 'C';
            } else if (grade >= 60) {
                letterGrade = 'D';
            } else {
                letterGrade = 'F';
            }

            if (plusMinus && letterGrade !== 'F') {
                if (grade >= 100) {
                    letterGrade += '+';
                } else {
                    grade %= 10;
                    if (grade <= 2) {
                        letterGrade += '-';
                    } else if (grade >= 7) {
                        letterGrade += '+';
                    }
                }
            }

            return letterGrade;

        }

    }

}());
