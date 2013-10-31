alchemy.display = (function() {
    var canvas, ctx,
        cols, rows,
        itemSize,
        items,
        firstRun = true;

    function createBackground() {
        var background = document.createElement("canvas"),
            bgctx = background.getContext("2d");

        $(background).addClass("background");
        background.width = cols * itemSize;
        background.height = rows * itemSize;

        bgctx.fillStyle = "rgba(225,235,255,0.15)";
        for (var x=0;x<cols;x++) {
            for (var y=0;y<cols;y++) {
                if ((x+y) % 2) {
                    bgctx.fillRect(
                        x * itemSize, y * itemSize,
                        itemSize, itemSize
                    );
                }
            }
        }
        return background;
    }

    function setup() {
        var $boardElement = $("#game-screen .game-board");

        cols = alchemy.settings.cols;
        rows = alchemy.settings.rows;
        itemSize = alchemy.settings.itemSize;

        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        $(canvas).addClass("board");
        canvas.width = cols * itemSize;
        canvas.height = rows * itemSize;
        ctx.scale(itemSize, itemSize);

        $boardElement.append(canvas);
        $boardElement.append(createBackground());
    }

    function drawItem(type, x, y, scale, rot) {
        var image = alchemy.images["images/sprites/items" +
                        itemSize + ".png"];

        ctx.drawImage(image,
            type * itemSize, 0, itemSize, itemSize,
            x, y, 1, 1
        );
        ctx.restore();
    }

    function redraw(newItems, callback) {
        var x, y;
        items = newItems;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                drawItem(items[x][y], x, y);
            }
        }
        callback();
    }

    function initialize(callback) {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        callback();
    }

    return {
        initialize : initialize,
        redraw : redraw
    }
})();
