(function() {
    // add event listeners
    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', newGame);

    var game = Game.getInstance();
    game.setup();

    function newGame() {
        game.start();
    }
})();
