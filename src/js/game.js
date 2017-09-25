var Game = (function() {
    var _instance;

    function init() {
        var _gameSize, _dimensions, _padding, _helper, _tileMap, _numberOfTilesGenerated;

        function setup(gameSize = 500, dimensions = 4, padding = 15) {
            console.log('Setup Game!');

            _gameSize = gameSize;
            _dimensions = dimensions;
            _padding = padding;
            _numberOfTilesGenerated = 0;

            _helper = GameHelper.getInstance(_gameSize, _dimensions, _padding);
            _tileMap = TileMap.getInstance();

            window.addEventListener('tileMoved', tileMovedEventListener);

            // get the element 'game'. If not found, throw error
            var gameElement = document.getElementById('game');
            if (!gameElement) {
                throw '\n element game not found! \n This element is required to setup the game';
            }

            gameElement.style.width = _gameSize + 'px';
            gameElement.style.height = _gameSize + 'px';

            generateSquares();
        }

        function startNewGame() {
            _tileMap.clear();
            generateTiles(2);
        }

        function tileMovedEventListener() {
            generateTiles();
        }

        var generateSquares = function() {
            console.log('generateSquares');

            var squareSize = _helper.calcSquareSize();
            // iterat over all the dimensins
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
            console.log('generateTiles');

            if (count < 1) {
                throw 'count can not be less the 1';
            }

            var squareSize = _helper.calcSquareSize();

            for (var i = 0; i < count; i++) {
                _numberOfTilesGenerated += 1;
                // generate a value for the tile, 0 = 2, 1 = 4;
                var value = 2; //Math.round(Math.random()) == 0 ? 2 : 4;

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
