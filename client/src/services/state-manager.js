(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('stateManager', stateManagerFactory);

    function stateManagerFactory() {

        var stateMeta = {};

        var state = {};

        var stateManager = {
            get: getState,
            set: setState
        };

        init();

        return stateManager;

        function init() {
            stateManager.set('grade', 1, {max: 1, decay: 120000});
        }

        function getNow() {
            return (new Date()).valueOf();
        }

        function getState(path) {
            var meta = _.get(stateMeta, path);
            var value = _.get(state, path);
            var time;
            if (meta.decay && value > 0) {
                time = getNow() - meta.timestamp;
                if (time > 50) {
                    value -= time * meta.max / meta.decay;
                    if (value < 0) {
                        value = 0;
                    }
                    stateManager.set(path, value);
                }
            }
            return value;
        }

        function setOptions(path, options) {
            if (options.decay) {
                _.set(stateMeta, path + '.decay', options.decay);
            }
            if (options.max) {
                _.set(stateMeta, path + '.max', options.max);
            }
        }

        function setState(path, newValue, options) {
            if (options) {
                setOptions(path, options);
            }
            var meta = _.get(stateMeta, path);
            if (meta.max && newValue > meta.max) {
                newValue = meta.max;
            }
            _.set(state, path, newValue);
            _.set(stateMeta, path + '.timestamp', getNow());
        }

    }

}());
