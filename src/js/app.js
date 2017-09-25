(function() {
    // add event listeners
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', newGame);
    var tryAgainButton = document.getElementById('try-again-button');
    tryAgainButton.addEventListener('click', newGame);
    var restartButton = document.getElementById('restart-button');
    tryAgainButton.addEventListener('click', newGame);

    window.addEventListener('scoreUpdate', scoreUpdateEventListener);

    var game = Game.getInstance();
    game.setup();
    game.startNewGame();

    function newGame() {
        document.getElementById('game-lost').style.display = 'none';
        document.getElementById('game-won').style.display = 'none';
        document.getElementById('score').innerText = 0;

        game.startNewGame();
    }

    function scoreUpdateEventListener(e) {
        var points = e.detail;
        var currentScore = document.getElementById('score').innerText;
        document.getElementById('score').innerText = parseInt(currentScore) + parseInt(points);
    }
})();
