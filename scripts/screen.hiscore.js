alchemy.screens["hiscore"] = (function() {
    var game = alchemy.game,
        storage = alchemy.storage,
        numScores = 10,
        firstRun = true;

    function setup() {
        $("#hiscore footer button[name=back]").bind("click", function(e) {
            game.showScreen("main-menu");
        });
    }

    function run(score) {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        populateList();
        if (typeof score != "undefined") {
            enterScore(score);
        }
    }

    function getScores() {
        return storage.get("hiscore") || [];
    }

    function enterScore(score) {
        var scores = getScores(),
            name, i, entry;
        for (i=0;i<=scores.length;i++) {
            if (i == scores.length || score > scores[i].score) {
                name = prompt("Please enter your name:");
                entry = {
                    name : name,
                    score : score
                };
                scores.splice(i, 0, entry);
                storage.set("hiscore", scores.slice(0, numScores));
                populateList();
                return;
            }
        }
    }

    function populateList() {
        var scores = getScores(),
            $list = $("#hiscore ol.score-list"),
            item, nameEl, scoreEl, i;

        // make sure the list is full
        for (var i=scores.length;i<numScores;i++) {
            scores.push({
                name : "---",
                score : 0
            });
        }

        $list.html("");

        for (i=0;i<scores.length;i++) {
            item = document.createElement("li");

            nameEl = document.createElement("span");
            $(nameEl).html(scores[i].name);

            scoreEl = document.createElement("span");
            $(scoreEl).html(scores[i].score);

            $(item).append(nameEl);
            $(item).append(scoreEl);
            $($list).append(item);
        }
    }


    return {
        run : run
    };

})();
