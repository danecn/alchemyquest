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
    },
    images : {}
};
window.addEventListener("load", function() {

    // determine item size
    var itemProto = document.getElementById("item-proto"),
        rect = itemProto.getBoundingClientRect();

    alchemy.settings.itemSize = rect.width;

    // Verify if browser enable standalone mode
    Modernizr.addTest("standalone", function() {
        return (window.navigator.standalone != false);
    });

    // extend yepnope with preloading
    yepnope.addPrefix("preload", function(resource) {
        resource.noexec = true;
        return resource;
    });

    var numPreload = 0,
        numLoaded = 0;

    yepnope.addPrefix("loader", function(resource) {
//         console.log("Loading: " + resource.url)

        var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
        resource.noexec = isImage;

        numPreload++;
        resource.autoCallback = function(e) {
            // console.log("Finished loading: " + resource.url)
            numLoaded++;
            if (isImage) {
                var image = new Image();
                image.src = resource.url;
                alchemy.images[resource.url] = image;
            }
        };
        return resource;
    });

    function getLoadProgress() {
        if (numPreload > 0) {
            return numLoaded / numPreload;
        } else {
            return 0;
        }
    }

    Modernizr.load([
        {
            //main files to load
            load : [
                "scripts/game.js"
            ]
        },
        {
            test : Modernizr.standalone,
            yep : "scripts/screen.splash.js",
            nope : "scripts/screen.install.js",
            complete : function() {
                alchemy.game.setup();
                if (Modernizr.standalone) {
                    alchemy.game.showScreen("splash-screen", getLoadProgress);
                } else {
                    alchemy.game.showScreen("install-screen");
                }
            }
        },
        {
            test : Modernizr.canvas,
            yep : "loader!scripts/display.canvas.js",
            nope : "loader!scripts/display.dom.js"
        },
        {
            test : Modernizr.webworkers,
            yep : [
                "loader!scripts/board.worker-interface.js",
                "preload!scripts/board.worker.js"
            ],
            nope : "loader!scripts/board.js"
        },
        {
            load : [
                "loader!scripts/screen.main-menu.js",
                "loader!scripts/screen.game.js",
                "loader!images/sprites/items"
                    + alchemy.settings.itemSize + ".png"
            ]
        }
    ]);

    Modernizr.load([

    ]);


}, false);
