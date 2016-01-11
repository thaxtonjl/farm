(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('ActionPanelCtrl', ActionPanelCtrl);

    function ActionPanelCtrl(stateManager) {

        var vm = this;

        // Methods
        vm.clickStudy = clickStudy;

        function clickStudy() {
            var currentGrade = stateManager.get('grade.decimal');
            stateManager.set('grade.decimal', currentGrade + 0.05);
        }

    }

}());
