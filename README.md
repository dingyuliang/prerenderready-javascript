# prerenderReady-javascript
The JavaScript library for prerenderReady by tracking ajax call and settimeout for both jQuery, angularJS 1.X.

## prerenderReady Introduction
When we use prerender.io, we can use window.prerenderReady to tell prerender.io service, the page is completely loaded. But it requires us to change a lot of existing code, which is a lot effort and not flexible.
prerenderReady provides the functionality which helps us
1. Tracks AJAX call automatically, after all AJAX calls are completed, it will automatically set window.prerenderReady to true.  
2. Provides an easy way to add tracking for setTimeout, so that we don't need to manually set window.prerenderReady.
There are two plugins which are built on prerenderReady library, one for jQuery, the other one for angularJS. 

### install prerenderReady with Nuget

    Install-Package DotNetOpen.PrerenderReady

  after you have installed PrerenderReady, there are 3 different javascript files.
  1. prerenderio.js
     prerenderReady library
  2. prerenderAngular1.js
     prerenderReady module for angularJS
  3. prerenderjQuery.js
     prerenderReady plugin for jQuery
  
  Once you have added prerenderio.js to your page, it will create a PrerenderIO object for window, you can get this object by
  
```
    window.prerender
```

### prerenderReady options

    var defaultOptions = {
        // maxTimeout for all ajax calls, after this timeout, it will set prerenderReady to true.
        // if there is no ajax call, will use this value.
        // if maxTimeout is NULL or any value <=0, won't setup timeout.
        maxTimeout: 1000,

        // noAjaxCheckTimeout for no ajax pages. Since Prerender.io has its min timeout, to improve performance, 
        // we can setup noAjaxCheckTimeout to notify Prerender.io that page is loaded completedly since there is no ajax calls.
        // the number depends on your application load time.
        noAjaxCheckTimeout:100,

        // ajaxCompleteTimeout for single ajax call, after this timeout, it will call complete() method to check whether all ajax calls have been finished, 
        // if yes, then set prerenderReady to true.
        // this setting is very useful, especially, when you have ajax call in another ajax call, or you have timeout in your ajax call.
        ajaxCompleteTimeout: 10,

        // debug = true, will output debug information.
        debug: false,

        // enable prerender ajax tracking for all ajax calls.
        // this setting is useful when you only want to use ajax tracking for some pages.
        // by now, we don't support to disable ajax tracking for single ajax call in one page.
        enable:true
    };

You can configure prerenderReady by calling

    window.prerender.config(options)

## use in jQuery project
  1. Install DotNetOpen.PrerenderReady nuget package.
  2. Add javascript references for both prerenderio.js and prerenderjQuery.js
  3. For AJAX call, you don't need to add any code, prerenderjQuery will automatically track AJAX call by jQuery ($.ajax, $.get, $.post, ...), and set window.prerenderReady to true after all AJAX call have been completed.
  4. For setTimeout, the window.prerender object has overwritten window.setTimeout by providing 3rd parameter TRUE/FALSE.
     If you want to track setTimeout for prerenderReady, just need to give the 3rd parameter to true, i.e. 

```     
setTimeout(function () {
  $(".ajax-data-container").append("<div> " + new Date() + " Error: " + response.responseText + "</div>");
}, 1000, true);
```

## use in angularJS project
  1. Install DotNetOpen.PrerenderReady nuget package.
  2. Add javascript references for both prerenderio.js and prerenderAngular1.js
  3. Inject prerenderIO module to your app module
```     
var module = angular.module("prerenderExample", ["prerenderIO"]);
```     
  4. For AJAX call, you don't need to add any code, prerenderAngular1 will automatically track AJAX call by angularJS 1.x ($http, $http.get, $http.post, ...), and set window.prerenderReady to true after all AJAX call have been completed.
  5. For setTimeout, you need to inject prerenderTimeout into your controller or directives, i.e. 

```     
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
   }]);
```

##Examples
  1. jQuery Example: https://github.com/dingyuliang/prerenderready-javascript/tree/master/src/example/jQuery 
  2. angularJS 1.x Example: https://github.com/dingyuliang/prerenderready-javascript/tree/master/src/example/angular1
