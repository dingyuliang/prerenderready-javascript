(function (window, $) {

    // config prerender.
    //window.prerender.config({
    //    maxTimeout: 5000,
    //    debug:true
    //});

    $.ajax({
        url: "../data.json?t=" + (new Date()),
        type: "GET",
        data: {},
        dataType: "json",
        success: function (data) {
            console.log(12)
            $(".ajax-data-container").append("<div> Success: " + " " + new Date() + " " + JSON.stringify(data) + "</div>");
        },
        error: function (response) {
            console.log(13)
            $(".ajax-data-container").append("<div> Error: " + " " + new Date() + " " + response.responseText + "</div>");
        }
    })
    .complete(function (response) {
        console.log(14)
    });

    $.get(
         "../data.json?t=" + (new Date() + 1),
        function (data) {
            console.log(22);
            setTimeout(function () {
                $(".ajax-data-container").append("<div> Success: " + " " + new Date() + " " + JSON.stringify(data) + "</div>");
            }, 2000);
        },
        "json"
    )
    .complete(function (response) {
        console.log(24) 
    })
    .error(function (response) {
        console.log(23)
        setTimeout(function () {
            $(".ajax-data-container").append("<div> Error: " + " " + new Date() + " " + response.responseText + "</div>");
        }, 2000);
    });

})(window, jQuery)