/*
 * version 1.0.3
 * Github: https://github.com/dingyuliang/prerenderready-javascript
 * Blog: http://netopensource.com/tag/prerender/
 * License: GNU GENERAL PUBLIC LICENSE, https://github.com/dingyuliang/prerenderready-javascript/blob/master/LICENSE
 */

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

