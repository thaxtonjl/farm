(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('stateManager', stateManagerFactory);

    function stateManagerFactory($interval) {

        var stateMeta = {};

        var state = {};

        var stateManager = {
            get: getState,
            live: {},
            set: setState
        };

        var updateList = [];

        init();

        return stateManager;

        function init() {
            stateManager.set('grade', 1, {max: 1, decay: 120000});
            $interval(function () {
                _.each(updateList, function (path) {
                    stateManager.get(path);
                });
            }, 500);
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
                if (!_.includes(updateList, path)) {
                    updateList.push(path);
                }
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
            _.set(stateManager.live, path, newValue);
            _.set(stateMeta, path + '.timestamp', getNow());
        }

    }

}());
