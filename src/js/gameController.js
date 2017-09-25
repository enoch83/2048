var GameController = (function() {
    var _tileMap = TileMap.getInstance();
    var MoveEnum = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

    window.addEventListener('keydown', keydownEventListener);

    function keydownEventListener(e) {
        var tiles = _tileMap.tiles();
        var moved;
        var key = e.keyCode;
        if (key === MoveEnum.LEFT) {
            moved = handleLeftMove(tiles);
        } else if (key === MoveEnum.RIGHT) {
            moved = handleRightMove(tiles);
        } else if (key === MoveEnum.UP) {
            moved = handleUpMove(tiles);
        } else if (key === MoveEnum.DOWN) {
            moved = handleDownMove(tiles);
        }

        if (moved) {
            var event = new CustomEvent('tileMoved');
            window.dispatchEvent(event);
        }
    }

    /*
    * sort all tiles by x in ascending order
    * iterate over all the tiles and check how meny steps to the left it can move
    * if steps to move grader then 0, move the tile to left based on number of steps
    * return true/false is tile where moved or merged
    */
    function handleLeftMove(tiles) {
        console.log('Move left');
        var moved = false;

        tiles = tiles.sort(function(t1, t2) {
            return t1.x - t2.x;
        });

        // if true, move the tile to
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            var sepsToMove = tile.canMoveLeft();
            if (sepsToMove > 0) {
                tile.moveLeft(sepsToMove);
                moved = true;
            }
        }

        return moved;
    }

    /*
    * sort all tiles by x in descending order
    * iterate over all the tiles and check how meny steps to the right it can move
    * if steps to move grader then 0, move the tile to right based on number of steps
    * return true/false is tile where moved or merged
    */
    function handleRightMove(tiles) {
        console.log('Move right');
        var moved = false;

        tiles = tiles.sort(function(t1, t2) {
            return t2.x - t1.x;
        });

        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            var sepsToMove = tile.canMoveRight();
            if (sepsToMove > 0) {
                tile.moveRight(sepsToMove);
                moved = true;
            }
        }

        return moved;
    }

    /*
    * sort all tiles by y in ascending order
    * iterate over all the tiles and check how meny steps up it can move
    * return true/false is tile where moved or merged
    */
    function handleUpMove(tiles) {
        console.log('Move up');
        var moved = false;

        tiles = tiles.sort(function(t1, t2) {
            return t1.y - t2.y;
        });

        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            var sepsToMove = tile.canMoveUp();
            if (sepsToMove > 0) {
                tile.moveUp(sepsToMove);
                moved = true;
            }
        }

        return moved;
    }

    /*
    * sort all tiles by y in ascending order
    * iterate over all the tiles and check how meny steps down it can move
    * return true/false is tile where moved or merged
    */
    function handleDownMove(tiles) {
        console.log('Move down');
        var moved = false;

        tiles = tiles.sort(function(t1, t2) {
            return t2.y - t1.y;
        });

        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            var stepsToMove = tile.canMoveDown();
            if (stepsToMove > 0) {
                tile.moveDown(stepsToMove);
                moved = true;
            }
        }

        return moved;
    }
})();
