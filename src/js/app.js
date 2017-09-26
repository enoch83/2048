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

    // get an instance of game, call setup and the start it.
    var game = Game.getInstance();
    game.setup();
    game.startNewGame();

    // resets the game and the score
    function newGame() {
        document.getElementById('game-lost').style.height = '0';
        document.getElementById('game-won').style.height = '0';
        document.getElementById('score').innerText = 0;

        game.startNewGame();
    }

    // triggered when there is a new score.
    // get the number of 'points' collected when merge was done.
    // get the current score and add them together.
    function scoreUpdateEventListener(e) {
        var points = e.detail;
        var currentScore = document.getElementById('score').innerText;
        document.getElementById('score').innerText = parseInt(currentScore) + parseInt(points);
    }

    // triggered when game is lost, show the game lost screen
    function gameLostEventListener() {
        document.getElementById('game-lost').style.height = '100%';
    }

    // triggered when game is won, show the game won screen
    function gameWonEventListener() {
        document.getElementById('game-won').style.height = '100%';
    }
})();
