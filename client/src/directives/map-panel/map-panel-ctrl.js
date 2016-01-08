(function () {
    'use strict';

    angular
        .module('farmApp')
        .controller('MapPanelCtrl', MapPanelCtrl);

    function MapPanelCtrl() {

        var vm = this;

        // Properties
        vm.tileRows = getTiles();

        function getTiles() {
            return [
                [
                    {
                        type: 'meadow'
                    },
                    {
                        type: 'home'
                    }
                ],
                [
                    {
                        type: 'forest'
                    },
                    {
                        type: 'forest'
                    }
                ]
            ];
        }

    }

}());
