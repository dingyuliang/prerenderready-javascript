(function (window, $) {

    if(typeof $ == "undefined")
        return;
     
    $(document)
    //use ajaxSend, make sure the ajax call has been sent successful.
	.ajaxSend(function () {
	    window.prerender.ajaxStart();
	})
	.ajaxComplete(function () {
	    window.prerender.ajaxComplete();
	});
	
})(window, jQuery)

