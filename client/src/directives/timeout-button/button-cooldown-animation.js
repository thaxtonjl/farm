(function () {
    'use strict';

    angular
        .module('farmApp')
        .animation('.button-cooldown', buttonCooldownAnimation);

    function buttonCooldownAnimation() {
        return {
            enter: function (element, doneFn) {
                var ms = element.parent().data('buttonTimeout');
                jQuery(element).animate({width: '0%'}, ms, 'linear', function () {
                    element.trigger('buttonCooldownDone');
                    doneFn();
                });
            }
        };
    }

}());
