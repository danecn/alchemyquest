alchemy.display = (function() {
    var cols, rows,
        itemSize,
        firstRun = true,
        itemSprites;

    function createBackground() {
        var x, y, cell,
            background = document.createElement("div");
        for (x=0;x<cols;x++) {
            for (y=0;y<cols;y++) {
                if ((x+y) % 2) {
                    cell = document.createElement("div");
                    $(cell).css('left', x + 'em');
                    $(cell).css('top', y + 'em');
                    $(background).append(cell);
                }
            }
        }
        $(background).addClass("board-bg");
        return background;
    }

    function setup() {
        var $boardElement = $("#game-screen .game-board"),
            container = document.createElement("div"),
            sprite,
            x, y;

        cols = alchemy.settings.cols;
        rows = alchemy.settings.rows;
        itemSize = alchemy.settings.itemSize;
        itemSprites = [];

        for (x=0;x<cols;x++) {
            itemSprites[x] = [];
            for (y=0;y<cols;y++) {
                sprite = document.createElement("div");
                $(sprite).addClass("item");
                $(sprite).css('left', x + "em");
                $(sprite).css('top', y + "em");
                $(sprite).css('background-image',
                    "url(images/sprites/items" + itemSize + ".png)");
                $(sprite).css('background-size',
                     (alchemy.settings[alchemy.settings.difficulty].numItemTypes * 100) + "%");
                itemSprites[x][y] = sprite;
                $(container).append(sprite);
            }
        }
        $(container).addClass("dom-container");
        $boardElement.append(container);
        $boardElement.append(createBackground());
    }

    function initialize(callback) {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        callback();
    }

    function drawItem(type, x, y) {
        var sprite = itemSprites[x][y];
        $(sprite).css('background-position', type + 'em 0em');
        $(sprite).css('display', 'block');
    }

    function redraw(items, callback) {
        var x, y;
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                drawItem(items[x][y], x, y, 0, 0)
            }
        }
        callback();
    }

    return {
        initialize : initialize,
        redraw : redraw
    };
})();
