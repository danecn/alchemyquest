/**
 * Load JS lib necessary to run the game
 */

//Define Game namespace
var alchemy = {
    screens : {}
};
window.addEventListener("load", function() {

    Modernizr.addTest("standalone", function() {
        return (window.navigator.standalone != false);
    });

    Modernizr.load([
        {
            //main files to load
            load : [
                "scripts/game.js",
                "scripts/screen.main-menu.js"
            ]
        },
        {
            test : Modernizr.standalone,
            yep : "scripts/screen.splash.js",
            nope : "scripts/screen.install.js",
            complete : function() {
                alchemy.game.setup();
                if (Modernizr.standalone) {
                    alchemy.game.showScreen("splash-screen");
                } else {
                    alchemy.game.showScreen("install-screen");
                }
            }
        }
    ]);


}, false);
