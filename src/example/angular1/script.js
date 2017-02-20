(function (window, angular) {

    // config prerender.
    //window.prerender.config({
    //    maxTimeout: 5000,
    //    debug:true
    //});

    var module = angular.module("prerenderExample", ["prerenderIO"]);

    module.controller("prerenderExampleController", ["$http", "$element", "$timeout", "prerenderTimeout", function ($http, $element, $timeout, prerenderTimeout) {

        var windowTimeout = 9000;
        var aspxTimeout = 2000;

        $element.append("<div> " + new Date() + " Start:" + JSON.stringify({ windowTimeout: windowTimeout + " ms", aspxTimeout: aspxTimeout + " ms" }) + "</div>");

        $http({
            url: "../data.json?t=" + (new Date()),
            method: "GET",
            responseType:"json"
        })
        .then(
            function (response) {
                console.log(12);
                var data = angular.extend({}, response.data);
                // angular.element doesn't work in controller.
                prerenderTimeout(function () {
                    data.Timeout = windowTimeout + " ms";
                    $element.append("<div> " + new Date() + " Success: " + JSON.stringify(data) + "</div>");
                }, windowTimeout);
            },
            function (response) {
                console.log(13);
                $timeout(function () {
                    $element.append("<div> " + new Date() + " Error: " + response + "</div>");
                }, windowTimeout);
            }
        );

        
        $http.get(
             "../../data.aspx",
             {
                 method: "GET",
                 responseType: "json",
                 params: {
                     stamp: (new Date() + 1),
                     t: aspxTimeout
                 },
             })
        .then(
            function (response) {
                console.log(22);
                // angular.element doesn't work in controller.
                $element.append("<div> " + new Date() + " Success: " + JSON.stringify(response.data) + "</div>");
            },
            function (response) {
                console.log(23);
                $element.append("<div> " + new Date() + " Error: " + response + "</div>");
            }
        );
    }]);

})(window, angular)