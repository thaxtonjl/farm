(function () {
    'use strict';

    angular
        .module('farmApp')
        .animation('.button-cooldown', buttonCooldownAnimation);

    function buttonCooldownAnimation(stateManager) {
        return {
            enter: function (element, doneFn) {
                var ms = element.parent().data('buttonTimeout');
                if (typeof ms !== 'number') {
                    ms = stateManager.get(ms);
                }
                jQuery(element).animate({width: '0%'}, ms, 'linear', function () {
                    element.trigger('buttonCooldownDone');
                    doneFn();
                });
            }
        };
    }

}());
