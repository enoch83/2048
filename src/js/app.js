(function() {
    // add event listeners
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', newGame);
    var tryAgainButton = document.getElementById('try-again-button');
    tryAgainButton.addEventListener('click', newGame);
    var restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', newGame);

    window.addEventListener('scoreUpdate', scoreUpdateEventListener);
    window.addEventListener('gameLost', gameLostEventListener);
    window.addEventListener('gameWon', gameWonEventListener);

    var game = Game.getInstance();
    game.setup();
    game.startNewGame();

    function newGame() {
        document.getElementById('game-lost').style.height = '0';
        document.getElementById('game-won').style.height = '0';
        document.getElementById('score').innerText = 0;

        game.startNewGame();
    }

    function scoreUpdateEventListener(e) {
        var points = e.detail;
        var currentScore = document.getElementById('score').innerText;
        document.getElementById('score').innerText = parseInt(currentScore) + parseInt(points);
    }

    function gameLostEventListener() {
        document.getElementById('game-lost').style.height = '100%';
    }

    function gameWonEventListener() {
        document.getElementById('game-won').style.height = '100%';
    }
})();
