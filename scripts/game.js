alchemy.game = (function() {

    /* hide the active screen (if any) and show the screen
     * with the specified id */ 
    function showScreen(screenId) {
        var $activeScreen = $("#game .screen.active"),
            $screen = $("#" + screenId);
        if ($activeScreen) {
            $activeScreen.removeClass("active");
        }
        // display the screen html
        $screen.addClass("active");
    }

    // expose public methods
    return {
        showScreen : showScreen
    };
})();
