# prerender-jswrapper
The JavaScript wrapper for prerender ready, within jQuery, angularJS.

## jQuery

```
(function (window, $) {
    $.extend($, {
        prerenderInit: function () {
            window.prerenderReady = false;
        },
        prerenderReady: function () {
            window.prerenderReady = true;
        }
    });

    $.prerenderInit();
})(window, jQuery)
```

## angularJS

```
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
```

