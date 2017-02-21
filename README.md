# prerenderReady-javascript
The JavaScript library for prerenderReady by tracking ajax call and settimeout for both jQuery, angularJS.

## prerenderReady library
prerenderReady library provides the basic functionality which helps to track AJAX call and setTimeout, so that it can let prerender.io know when the page has been completely loaded.
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


## use in angularJS project

