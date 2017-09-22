var TileMap = (function() {
    var _instance;

    function init() {
        var _tileMap = new Map();

        function setTile(y, x, obj) {
            var key = `${y}_${x}`;
            _tileMap.set(key, obj);
        }

        function getTile(y, x) {
            return _tileMap.get(`${y}_${x}`);
        }

        function hasTile(y, x) {
            console.log(`has(${y}_${x})`);
            return _tileMap.has(`${y}_${x}`);
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
