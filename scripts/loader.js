/**
 * Load JS lib necessary to run the game
 */

//Define Game namespace
var alchemy = {
    screens : {},
    settings : {
        rows : 8,
        cols : 8,
        easy : {
            baseScore : 100,
            numItemTypes : 7,
            baseTimerBoost: 30,
            baseLevelTimer : 120000,
            baseLevelScore : 1500,
            baseLevelExp : 1.05
        },
        normal : {
            baseScore : 100,
            numItemTypes : 8,
            baseTimerBoost: 20,
            baseLevelTimer : 90000,
            baseLevelScore : 1500,
            baseLevelExp : 1.075
        },
        hard : {
            baseScore : 100,
            numItemTypes : 9,
            baseTimerBoost: 10,
            baseLevelTimer : 60000,
            baseLevelScore : 1500,
            baseLevelExp : 1.1
        },
        difficulty: 'normal'
    }
};
window.addEventListener("load", function() {

    Modernizr.addTest("standalone", function() {
        return (window.navigator.standalone != false);
    });

    // extend yepnope with preloading
    yepnope.addPrefix("preload", function(resource) {
        resource.noexec = true;
        return resource;
    });

    Modernizr.load([
        {
            //main files to load
            load : [
                "scripts/game.js",
                "scripts/screen.main-menu.js",
                "scripts/board.js"
            ]
        },
        {
            test : Modernizr.webworkers,
            yep : [
                "scripts/board.worker-interface.js",
                "preload!scripts/board.worker.js"
            ],
            nope : "scripts/board.js"
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
