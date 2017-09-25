(function() {
    // add event listeners
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', newGame);

    window.addEventListener('scoreUpdate', scoreUpdateEventListener);

    var game = Game.getInstance();
    game.setup();
    game.startNewGame();

    function newGame() {
        game.startNewGame();

        document.getElementById('score').innerText = 0;
    }

    function scoreUpdateEventListener(e) {
        var points = e.detail;

        var currentScore = document.getElementById('score').innerText;
        console.log(currentScore);

        document.getElementById('score').innerText = parseInt(currentScore) + parseInt(points);
    }
})();
