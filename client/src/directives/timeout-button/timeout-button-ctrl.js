(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('TimeoutButtonCtrl', TimeoutButtonCtrl);

    function TimeoutButtonCtrl() {

        var vm = this;

        // Properties
        vm.isDisabled = false;

        // Methods
        vm.handleClick = handleClick;

        function handleClick() {
            if (!vm.isDisabled) {
                vm.isDisabled = true;
                vm.buttonAction();
            }
        }

    }

}());
