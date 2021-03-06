var TileMap = (function() {
    var _instance;

    function init() {
        var _tileMap = new Map();
        var _tileMergedMap = new Map();

        function setTile(y, x, obj) {
            var key = `${y}_${x}`;
            _tileMap.set(key, obj);
        }

        function deleteTile(y, x) {
            var key = `${y}_${x}`;
            _tileMap.delete(key);
        }

        function getTile(y, x) {
            var key = `${y}_${x}`;
            return _tileMap.get(key);
        }

        function hasTile(y, x) {
            var key = `${y}_${x}`;
            return _tileMap.has(key);
        }

        function tiles() {
            var tiles = [];
            _tileMap.forEach(function(value, key) {
                tiles.push(value);
            });

            return tiles;
        }

        function clear() {
            _tileMap = new Map();
        }

        function setTileMerged(y, x) {
            var key = `${y}_${x}`;
            _tileMergedMap.set(key, true);
        }

        function hasTileMerged(y, x) {
            var key = `${y}_${x}`;
            return _tileMergedMap.has(key);
        }

        function clearMerged() {
            _tileMergedMap = new Map();
        }

        return {
            setTile,
            deleteTile,
            getTile,
            hasTile,
            tiles,
            clear,
            setTileMerged,
            hasTileMerged,
            clearMerged
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
