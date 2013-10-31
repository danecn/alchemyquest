alchemy.screens["game-screen"] = (function() {
    var board = alchemy.board,
        display = alchemy.display;

    function run() {
        board.initialize(false,
            function() {
                display.initialize(function() {
                    display.redraw(board.getBoard(), function() {
                        // do nothing for now
                    });
                });
            }
        );
    }

    return {
        run : run
    };
})();
