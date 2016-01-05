(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('MapTileCtrl', MapTileCtrl);

    function MapTileCtrl() {

        var vm = this;

        // Properties
        vm.glyphicon = '';

        init();

        function init() {
            switch (vm.options.type) {
                case 'home':
                    vm.glyphicon = 'home';
                    break;
                case 'meadow':
                    vm.glyphicon = 'grain';
                    break;
                case 'forest':
                    vm.glyphicon = 'tree-conifer';
                    break;
                default:
                    vm.glyphicon = 'remove';
            }
        }

    }

}());
