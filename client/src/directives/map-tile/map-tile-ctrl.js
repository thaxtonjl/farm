(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('MapTileCtrl', MapTileCtrl);

    function MapTileCtrl() {

        var vm = this;

        // Properties
        vm.active = false;
        vm.glyphicon = '';

        init();

        function init() {
            switch (vm.options.type) {
                case 'home':
                    vm.glyphicon = 'home';
                    vm.active = true;
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
