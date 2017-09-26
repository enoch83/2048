var Game = (function() {
    var _instance;

    function init() {
        var _gameSize, _dimensions, _padding, _helper, _tileMap, _numberOfTilesGenerated;

        function setup() {
            var gameSize = parseInt(window.innerWidth / 100) * 90;
            gameSize = gameSize > 600 ? 600 : gameSize;

            _gameSize = gameSize;
            _dimensions = 4;
            _padding = 15;
            _numberOfTilesGenerated = 0;

            _helper = GameHelper.getInstance(_gameSize, _dimensions, _padding);
            _tileMap = TileMap.getInstance();

            // Add a event listener to tile moved.
            window.addEventListener('moveMade', moveMadeEventListener);

            // get the element 'game'. If not found, throw error
            var gameElement = document.getElementById('game');
            if (!gameElement) {
                throw '\n element game not found! \n This element is required to setup the game';
            }

            gameElement.style.width = _gameSize + 'px';
            gameElement.style.height = _gameSize + 'px';

            generateSquares();
        }

        // start a new game
        // for all existing tiles, call destroy, then clear the tile map
        // generate two new tiles
        function startNewGame() {
            var tiles = _tileMap.tiles();
            tiles.forEach(function(value, key) {
                value.destroy();
            });

            _tileMap.clear();
            generateTiles(2);
        }

        // triggered every time a move was made
        // generate a new tile.
        // check if game is lost ow won.
        var moveMadeEventListener = function() {
            generateTiles();

            if (isGameLost()) {
                window.dispatchEvent(new CustomEvent('gameLost'));
            }

            if (isGameWon()) {
                window.dispatchEvent(new CustomEvent('gameWon'));
            }
        };

        // return true/false if game is won.
        // loop over all the tiles, if any has a value of 2048, game is won and true is returnd
        var isGameWon = function() {
            var tiles = _tileMap.tiles();
            for (var i = 0; i < tiles.length; i++) {
                if (tiles[i].value == 2048) {
                    return true;
                }
            }
            return false;
        };

        // return true/false if game is lost.
        // when the number of tiles is 16(max number of tiles), check if any one can be moved left, right, up or down.
        // if none can be moved, game is lost and true is returnd
        var isGameLost = function() {
            var tiles = _tileMap.tiles();
            if (tiles.length < 16) return false;

            for (var i = 0; i < tiles.length; i++) {
                if (tiles[i].canMoveLeft() > 0 || tiles[i].canMoveRight() > 0 || tiles[i].canMoveUp() > 0 || tiles[i].canMoveDown() > 0) {
                    return false;
                }
            }

            return true;
        };

        var generateSquares = function() {
            var squareSize = _helper.calcSquareSize();

            // iterate over all the dimensins
            // start with the y-axis, then the x-axis
            for (var y = 0; y < _dimensions; y++) {
                for (var x = 0; x < _dimensions; x++) {
                    // create a new div element
                    // add the class square to the element (see .square in main.css)
                    var div = document.createElement('div');
                    div.classList.add('square');

                    // set width and hight of element to the calculated square size
                    div.style.width = squareSize + 'px';
                    div.style.height = squareSize + 'px';

                    div.style.top = _helper.calcTop(y, squareSize) + 'px';
                    div.style.left = _helper.calcLeft(x, squareSize) + 'px';

                    game.appendChild(div);
                }
            }
        };

        var generateTiles = function(count = 1) {
            if (count < 1) {
                throw 'count can not be less the 1';
            }

            var squareSize = _helper.calcSquareSize();

            for (var i = 0; i < count; i++) {
                _numberOfTilesGenerated += 1;

                // generate a value for the tile, 0 = 2, 1 = 4;
                var value = Math.round(Math.random()) == 0 ? 2 : 4;

                // we have to find a square where there is no tile, an empty square.
                let emptySquareFound = false;
                while (!emptySquareFound) {
                    // generate two random numers, one for y-axis and one for x-axis
                    const y = Math.round(Math.random() * (_dimensions - 1));
                    const x = Math.round(Math.random() * (_dimensions - 1));

                    // if there is now tile at this position, create one and set to tile map
                    // render the tile
                    if (!_tileMap.hasTile(y, x)) {
                        emptySquareFound = true;

                        var tile = new Tile(y, x, value, _numberOfTilesGenerated);
                        _tileMap.setTile(y, x, tile);

                        tile.render();
                    }
                }
            }
        };

        return {
            setup,
            startNewGame
        };
    }

    return {
        getInstance: function() {
            if (!_instance) {
                _instance = init();
            }

            return _instance;
        }
    };
})();
