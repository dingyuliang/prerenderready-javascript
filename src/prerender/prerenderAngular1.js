/*
 * version 1.0.3
 * Github: https://github.com/dingyuliang/prerenderready-javascript
 * Blog: http://netopensource.com/tag/prerender/
 * License: GNU GENERAL PUBLIC LICENSE, https://github.com/dingyuliang/prerenderready-javascript/blob/master/LICENSE
 */

(function (window, angular) {

    if (typeof angular == "undefined")
        return;

    var module = angular.module("prerenderIO", []);

    // we can use httpInterceptor  or request/response transformations;
    // see https://docs.angularjs.org/api/ng/service/$http
    module
    .service("prerenderHttpInterceptor", ["$q", function ($q) {
        return {
            'request': function (config) {
                // do something on success
                window.prerender.ajaxStart();
                return config;
            },
            'requestError': function (rejection) {
                // do something on error
                window.prerender.ajaxComplete();
                return $q.reject(rejection);
            },
            'response': function (response) {
                // do something on success
                //if (canRecover(rejection)) {
                //    return responseOrNewPromise
                //}
                window.prerender.ajaxComplete();
                return response;
            },
            'responseError': function (rejection) {
                // do something on error
                window.prerender.ajaxComplete();
                return $q.reject(rejection);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("prerenderHttpInterceptor");
    }])
    .factory("prerenderTimeout", ["$timeout", function ($timeout) {
        return function () {
            window.prerender.ajaxStart();
            $timeout
                .apply(null, arguments)
                .then(
                function () {
                    window.prerender.ajaxComplete();
                }, function () {
                    window.prerender.ajaxComplete();
                });
        };
    }]);
    
})(window, angular)

