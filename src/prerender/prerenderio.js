/*
 * version 1.0.3
 * Github: https://github.com/dingyuliang/prerenderready-javascript
 * Blog: http://netopensource.com/tag/prerender/
 * License: GNU GENERAL PUBLIC LICENSE, https://github.com/dingyuliang/prerenderready-javascript/blob/master/LICENSE
 */

(function (window) {
    // by now, we don't support to disable ajax tracking for single ajax call in one page.

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
    // check if we have default prerenderOptions before loading this javascript library
    if (window.prerenderOptions) {
        for (var pName in window.prerenderOptions) {
            defaultOptions[pName] = window.prerenderOptions[pName];
        }
    }

    function PrerenderIO(options) {
        this._ajaxCount = 0;
        this._maxTimeoutID = null;
        this._ajaxCompleteTimeoutID = null;
        this._options = {};

        this.config(options || defaultOptions);

        Object.defineProperty(this, "_ready", {
            get: function () {
                return window.prerenderReady;
            },
            set: function (value) {
                window.prerenderReady = value;
            }
        });

        this.init();
    };

    PrerenderIO.prototype = {
        // configure prerender options, we can call this multiple times, the last time will be applied finally.
        config: function (options) {
            var $this = this;
            for (var pName in options) {
                $this._options[pName] = options[pName];
            }

            // maxTimeout setting
            $this.log("maxTimeout start")
            if ($this._maxTimeoutID) {
                clearTimeout($this._maxTimeoutID);
            }
            // always call this, so that we can make sure _ready = true after maxTimeout.
            if ($this._options.maxTimeout && $this._options.maxTimeout > 0) {
                $this._maxTimeoutID = setTimeout(function () {
                    $this.complete();
                    clearTimeout($this._maxTimeoutID);
                    $this.log("maxTimeout end");
                }, $this._options.maxTimeout);
            }

            // noAjaxCheckTimeout setting
            $this.log("noAjaxCheckTimeout start")
            if ($this._ajaxCompleteTimeoutID) {
                clearTimeout($this._ajaxCompleteTimeoutID);
            }
            // always call this, so that we can make sure _ready = true after maxTimeout.
            if ($this._options.noAjaxCheckTimeout && $this._options.noAjaxCheckTimeout > 0) {
                $this._ajaxCompleteTimeoutID = setTimeout(function () {
                    if ($this._ajaxCount <= 0) {
                        $this.complete();
                    }
                    clearTimeout($this._ajaxCompleteTimeoutID);
                    $this.log("noAjaxCheckTimeout end");
                }, $this._options.noAjaxCheckTimeout);
            }
        },
        init: function () {
            //this._ready = false;
            var $this = this;

            // overwrite window.setTimeout default logic.
            var oldSetTimeout = window.setTimeout;
            window.setTimeout = function (fn, timeout, prerender) {
                var needPrerender = $this._options.enable == true && prerender == true;

                if (needPrerender) {
                    $this.ajaxStart();
                }

                oldSetTimeout(function () {
                    fn.apply(null);

                    if (needPrerender) {
                        $this.ajaxComplete();
                    }

                }, timeout);
            };

        },
        complete: function () {
            this._ready = true;
            this.log("complete");
        },
        ajaxStart: function () {
            if (this._options.enable == true) {

                // setup _ready in ajaxStart() instead of init(), so that we can avoid setting _ready to false when there is no ajax call 
                // once we set _ready to false, prerenderio won't return until it's true, then it will take the maxTimeout and slow down requests.
                this._ready = false;

                this._ajaxCount++;
            }
            this.log("ajaxStart");
        },
        ajaxComplete: function () {
            var $this = this;
            
            if ($this._options.enable == true) {
                setTimeout(function () {
                    $this._ajaxCount--;
                    if ($this._ajaxCount <= 0) {
                        $this.complete();
                    }
                }, $this._options.ajaxCompleteTimeout);
            } else {
                $this.complete();
            }

            $this.log("ajaxComplete");
        },
        log: function (message) {
            if (message) {
                var $this = this;
                if ($this._options.debug == true) {
                    console.log(new Date() + " | ajaxCount:" + $this._ajaxCount + " | " + message);
                }
            }
        } 
    }

    // initialize a default prerender object.
    window.prerender = new PrerenderIO();

})(window)

