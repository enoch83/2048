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

        var key = e.keyCode;
        if (key === MoveEnum.LEFT) {
            console.log('Move left');

            // sort all tiles by x in ascending
            tiles = tiles.sort(function(t1, t2) {
                return t1.x - t2.x;
            });

            // iterate over all the tiles and check if tile can be moved to left
            // if true, move the tile to
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                if (tile.canMoveLeft()) {
                    tile.moveLeft();
                }
            }
        } else if (key === MoveEnum.RIGHT) {
            console.log('Move right');
        } else if (key === MoveEnum.UP) {
            console.log('Move up');
        } else if (key === MoveEnum.DOWN) {
            console.log('Move down');
        }
    }
})();
