(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('MapPanelCtrl', MapPanelCtrl);

    function MapPanelCtrl() {

        var vm = this;

        // Properties
        vm.tileRows = getTiles();

        init();

        function init() {
            //
        }

        function getTiles() {
            return [
                [
                    {
                        glyphicon: 'grain'
                    },
                    {
                        glyphicon: 'home'
                    }
                ],
                [
                    {
                        glyphicon: 'tree-deciduous'
                    },
                    {
                        glyphicon: 'tree-conifer'
                    }
                ]
            ];
        }

    }

}());
