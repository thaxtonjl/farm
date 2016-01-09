(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('GoalPanelCtrl', GoalPanelCtrl);

    function GoalPanelCtrl($interval, $scope, stateManager) {

        var vm = this;

        // Properties
        vm.grade = 0;
        vm.letterGrade = 'E';

        init();

        function init() {

            var promise = $interval(fetchGrade, 500);
            fetchGrade();
            $scope.$on('$destroy', clearTheInterval);

            function clearTheInterval() {
                $interval.cancel(promise);
            }

            function fetchGrade() {
                var grade = stateManager.get('grade') * 100;
                vm.grade = grade.toFixed(4);
                if (grade >= 89.5) {
                    vm.letterGrade = 'A';
                } else if (grade >= 79.5) {
                    vm.letterGrade = 'B';
                } else if (grade >= 69.5) {
                    vm.letterGrade = 'C';
                } else if (grade >= 59.5) {
                    vm.letterGrade = 'D';
                } else {
                    vm.letterGrade = 'F';
                }
            }

        }

    }

}());
