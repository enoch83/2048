(function() {
    // add event listeners
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', newGame);

    window.addEventListener('scoreUpdate', scoreUpdateEventListener);

    var game = Game.getInstance();
    game.setup();

    function newGame() {
        game.start();
    }

    function scoreUpdateEventListener(e) {
        var points = e.detail;

        var currentScore = document.getElementById('score').innerText;
        console.log(currentScore);

        document.getElementById('score').innerText = parseInt(currentScore) + parseInt(points);
    }
})();
