(function (window, angular) {
    angular.extend(angular, {
        prerenderInit: function () {
            window.prerenderReady = false;
        },
        prerenderReady: function () {
            window.prerenderReady = true;
        }
    });

    angular.prerenderInit();
})(window, angular)
