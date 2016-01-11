(function () {
    'use strict';

    angular
        .module('farmApp')
        .factory('stateManager', stateManagerFactory);

    function stateManagerFactory($interval, $rootScope) {

        var stateMeta = {};

        var state = {};

        var stateManager = {
            calc: calcState,
            get: getState,
            live: {},
            set: setState
        };

        var updateList = [];

        init();

        return stateManager;

        function init() {

            $rootScope.live = stateManager.live;

            stateManager.set('grade.decimal', 1, {max: 1, decay: 120000});
            stateManager.calc('grade.letter', ['grade.decimal', _.partial(getLetterGrade, _, false)]);
            stateManager.calc('grade.letterPlus', ['grade.decimal', _.partial(getLetterGrade, _, true)]);

            $interval(function () {
                _.each(updateList, function (path) {
                    stateManager.get(path);
                });
            }, 500);

        }

        function addDerivative(paths, calc) {
            _.each(paths, function (path) {
                var meta = getMeta(path);
                if (meta.derivatives) {
                    meta.derivatives.push(calc);
                } else {
                    setMeta(path + '.derivatives', [calc]);
                }
            });
        }

        function calcState(path, params) {
            var funk = params.pop();
            var meta = {
                calc: function () {
                    var value = funk.apply(null, resolveParams(params));
                    stateManager.set(path, value);
                }
            };
            meta.calc();
            setMeta(path, meta);
            addDerivative(params, meta.calc);
        }

        function decayValue(path, value, meta) {
            var time = getNow() - meta.timestamp;
            if (time > 50) {
                value -= time * meta.max / meta.decay;
                if (value < 0) {
                    value = 0;
                }
                stateManager.set(path, value);
            }
        }

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

        function getMeta(path) {
            return _.get(stateMeta, path) || {};
        }

        function getNow() {
            return (new Date()).valueOf();
        }

        function getState(path) {
            var meta = getMeta(path);
            var value = _.get(state, path);
            if (meta.decay && value > 0) {
                decayValue(path, value, meta);
            }
            return value;
        }

        function resolveParams(params) {
            return _.map(params, function (path) {
                return stateManager.get(path);
            })
        }

        function setMeta(path, value) {
            _.set(stateMeta, path, value);
        }

        function setOptions(path, options) {
            if (options.decay) {
                setMeta(path + '.decay', options.decay);
                if (!_.includes(updateList, path)) {
                    updateList.push(path);
                }
            }
            if (options.max) {
                setMeta(path + '.max', options.max);
            }
        }

        function setState(path, newValue, options) {
            if (options) {
                setOptions(path, options);
            }
            var meta = getMeta(path);
            if (meta.max && newValue > meta.max) {
                newValue = meta.max;
            }
            _.set(state, path, newValue);
            _.set(stateManager.live, path, newValue);
            setMeta(path + '.timestamp', getNow());
            if (meta.derivatives) {
                _.each(meta.derivatives, function (calc) {
                    calc();
                });
            }
        }

    }

}());
