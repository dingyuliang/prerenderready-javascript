(function (window, angular) {

    // config prerender.
    //window.prerender.config({
    //    maxTimeout: 5000,
    //    debug:true
    //});

    var module = angular.module("prerenderExample",[]);

    module.controller("prerenderExampleController", ["$http", "$element", "$timeout", function ($http, $element, $timeout) {
        $http({
            url: "../data.json?t=" + (new Date()),
            method: "GET",
            responseType:"json"
        })
        .then(
            function (response) {
                console.log(12)
                // angular.element doesn't work in controller.
                $element.append("<div> Success: " + " " + new Date() + " " + JSON.stringify(response.data) + "</div>");
            },
            function (response) {
                console.log(13)
                $element.append("<div> Error: " + " " + new Date() + " " + response + "</div>");
            }
        );

        
        $http.get(
             "../data.json?t=" + (new Date()),
             {
                 method: "GET",
                 responseType: "json"
             })
        .then(
            function (response) {
                console.log(22)
                // angular.element doesn't work in controller.
                $timeout(function () {
                    $element.append("<div> Success: " + " " + new Date() + " " + JSON.stringify(response.data) + "</div>");
                }, 2000);
            },
            function (response) {
                console.log(23)
                
                $timeout(function () {
                    $element.append("<div> Error: " + " " + new Date() + " " + response + "</div>");
                }, 2000);
            }
        );
    }]);

})(window, angular)