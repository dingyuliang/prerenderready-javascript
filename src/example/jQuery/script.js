(function (window, $) {
    $(function () {
        // config prerender.
        //window.prerender.config({
        //    maxTimeout: 5000,
        //    debug:true
        //});

        var windowTimeout = 9000;
        var aspxTimeout = 2000;

        $(".ajax-data-container").append("<div> " + new Date() + " Start:" + JSON.stringify({ windowTimeout: windowTimeout + " ms", aspxTimeout: aspxTimeout + " ms" }) + "</div>");

        $.ajax({
            url: "../data.json?t=" + (new Date()),
            type: "GET",
            data: {},
            dataType: "json",
            success: function (data) {
                console.log(12);
                data.Timeout = windowTimeout + " ms";
                setTimeout(function () {
                    $(".ajax-data-container").append("<div> " + new Date() + " Success: " + JSON.stringify(data) + "</div>");
                }, windowTimeout, true);
            },
            error: function (response) {
                console.log(13)
                setTimeout(function () {
                    $(".ajax-data-container").append("<div> " + new Date() + " Error: " + response.responseText + "</div>");
                }, windowTimeout, true);
            }
        })
        .complete(function (response) {
            console.log(14);
        });

        $.get(
             "../../data.aspx",
             {
                 stamp: (new Date() + 1),
                 t: aspxTimeout
             },
            function (data) {
                console.log(22);
                $(".ajax-data-container").append("<div> " + new Date() + " Success: " + JSON.stringify(data) + "</div>");
            },
            "json"
        )
        .complete(function (response) {
            console.log(24);
        })
        .error(function (response) {
            console.log(23);
            $(".ajax-data-container").append("<div> " + new Date() + " Error: " + response.responseText + "</div>");
        });
    });
})(window, jQuery)