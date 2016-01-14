(function () {
    'use strict';

    angular
        .module('farmApp')
        .directive('timeoutButton', timeoutButton);

    function timeoutButton() {

        return {
            bindToController: {
                buttonAction: '&',
                buttonTimeout: '=',
                buttonTitle: '='
            },
            controller: 'TimeoutButtonCtrl',
            controllerAs: 'timeoutButton',
            link: timeoutButtonLink,
            restrict: 'E',
            scope: {},
            templateUrl: '/directives/timeout-button/timeout-button.html'
        };

        function timeoutButtonLink($scope, el, attrs, ctrl) {

            el.data('buttonTimeout', ctrl.buttonTimeout);
            el.on('click', handleClick);
            el.on('buttonCooldownDone', buttonCooldownDone);

            $scope.$watch(isDisabled, function (isDisabledIsTruthy) {
                if (isDisabledIsTruthy) {
                    el.addClass('disabled');
                } else {
                    el.removeClass('disabled');
                }
            });

            function buttonCooldownDone() {
                $scope.$apply(function () {
                    ctrl.isDisabled = false;
                });
            }

            function handleClick() {
                $scope.$apply(ctrl.handleClick);
            }

            function isDisabled() {
                return ctrl.isDisabled;
            }

        }

    }

}());
