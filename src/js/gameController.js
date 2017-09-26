var GameController = (function() {
    var _tileMap = TileMap.getInstance();
    var MoveEnum = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

    window.addEventListener('keydown', keydownEventListener);
    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchmove', handleTouchMove, false);

    function keydownEventListener(e) {
        var tiles = _tileMap.tiles();
        _tileMap.clearMerged();

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
            var event = new CustomEvent('moveMade');
            window.dispatchEvent(event);
        }
    }

    var xDown = null;
    var yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        var tiles = _tileMap.tiles();
        _tileMap.clearMerged();
        var moved;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                moved = handleLeftMove(tiles);
            } else {
                moved = handleRightMove(tiles);
            }
        } else {
            if (yDiff > 0) {
                moved = handleUpMove(tiles);
            } else {
                moved = handleDownMove(tiles);
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;

        if (moved) {
            var event = new CustomEvent('moveMade');
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
