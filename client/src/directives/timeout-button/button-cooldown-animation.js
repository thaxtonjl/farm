(function () {
    'use strict';

    angular
        .module('farmApp')
        .animation('.button-cooldown', buttonCooldownAnimation);

    function buttonCooldownAnimation() {
        return {
            enter: function (element, doneFn) {
                jQuery(element).animate({width: '0%'}, 4500, 'linear', function () {
                    element.trigger('buttonCooldownDone');
                    doneFn();
                });
            }
        };
    }

}());
