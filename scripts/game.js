alchemy.game = (function() {

    /* hide the active screen (if any) and show the screen
     * with the specified id */ 
    function showScreen(screenId) {
        var $activeScreen = $("#game .screen.active"),
            $screen = $("#" + screenId);
        if ($activeScreen) {
            $activeScreen.removeClass("active");
        }
        // run the screen module
        alchemy.screens[screenId].run();
        // display the screen html
        $screen.addClass("active");
    }

    function setup() {
        // disable native touchmove behavior to
        // prevent overscroll
        $(document).bind("touchmove", function(event) {
            event.preventDefault();
        });
        // hide the address bar on Android devices
        if (/Android/.test(navigator.userAgent)) {
            $("html").css('height', '200%');
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 0);
        }
    }

    // expose public methods
    return {
        setup : setup,
        showScreen : showScreen
    };
})();
