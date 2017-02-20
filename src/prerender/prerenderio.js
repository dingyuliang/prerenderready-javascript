(function (window) {
    var defaultOptions = {
        maxTimeout: 3000,
        ajaxCompleteTimeout: 10,
        debug: false,
    };
    if (window.prerenderOptions) {
        for (var pName in window.prerenderOptions) {
            defaultOptions[pName] = window.prerenderOptions[pName];
        }
    }

    function PrerenderIO(options) {
        this._ajaxCount = 0;
        this._maxTimeoutObj = null;
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
        config: function (options) {
            var $this = this;
            for (var pName in options) {
                $this._options[pName] = options[pName];
            }

            $this.log("maxTimeout start")
            if ($this._maxTimeoutObj) {
                clearTimeout($this._maxTimeoutObj)
            }
            $this._maxTimeoutObj = setTimeout(function () {
                $this.complete();
                $this.log("maxTimeout end")
            }, $this._options.maxTimeout);
        },
        init: function () {
            this._ready = false;
        },
        complete: function () {
            if (this._ready == false) {
                this.log("complete");
                this._ready = true;
            }
        },
        ajaxStart: function () {
            this._ajaxCount++;
            this.log("ajaxStart");
        },
        ajaxComplete: function () {
            var $this = this;
            $this._ajaxCount--;
            $this.log("ajaxComplete");
            setTimeout(function () {
                if ($this._ajaxCount <= 0) {
                    $this.complete();
                }
            }, $this._options.ajaxCompleteTimeout);
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

    window.prerender = new PrerenderIO();

})(window)

