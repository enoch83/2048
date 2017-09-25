var TileMap = (function() {
    var _instance;

    function init() {
        var _tileMap = new Map();

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

        return {
            setTile,
            deleteTile,
            getTile,
            hasTile,
            tiles
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
