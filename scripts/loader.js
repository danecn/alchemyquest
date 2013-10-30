/**
 * Load JS lib necessary to run the game
 */

//Define Game namespace
var alchemy = {};

window.addEventListener("load", function() {

Modernizr.load([
    {
        test : Modernizr.touch,
        yep : "scripts/lib/jquery.mobile.min.js",
        nope : "scripts/lib/jquery.min.js"
    },
    {
        load : [
            "scripts/game.js"
        ],
        complete : function() {
            alchemy.game.showScreen("splash-screen");
        }
    }
]);

}, false);
