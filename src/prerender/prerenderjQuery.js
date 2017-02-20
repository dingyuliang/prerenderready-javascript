(function (window, $) {

    if(typeof $ == "undefined")
        return;
     
	$(document)
	.ajaxSend(function () {
	    window.prerender.ajaxStart();
	})
	.ajaxComplete(function () {
	    window.prerender.ajaxComplete();
	});
	
})(window, jQuery)

