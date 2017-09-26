var GameHelper = (function() {
    var _instance;

    function init(gameSize, dimensions, padding) {
        var _gameSize = gameSize;
        var _dimensions = dimensions;
        var _padding = padding;

        /*
        * calculate the size of a square based on the gameSize and dimensions
        * adjust the square size by removing padding + some more for padding on the right side of the last 'column'
        */
        function calcSquareSize() {
            var squareSize = _gameSize / _dimensions;
            squareSize -= _padding + _padding / _dimensions;

            return squareSize;
        }

        /*
        * calculate top of element based on the y-axis.
        * add the padding multiplied by the axis + 1.
        */
        function calcTop(y, squareSize) {
            var top = y * squareSize;
            top += _padding * (y + 1);

            return top;
        }

        /*
        * calculate left of element based on the x-axis.
        * add the padding multiplied by the axis + 1.
        */
        function calcLeft(x, squareSize) {
            var left = x * squareSize;
            left += _padding * (x + 1);

            return left;
        }

        function getDimentions() {
            return _dimensions;
        }

        return {
            calcSquareSize,
            calcTop,
            calcLeft,
            getDimentions
        };
    }

    return {
        getInstance: function(gameSize, dimensions, padding) {
            if (!_instance) {
                if (!gameSize) throw 'game size must be provided when instanciating game helper';

                if (!dimensions) throw 'game size must be provided when instanciating game helper';

                if (!padding) throw 'game size must be provided when instanciating game helper';

                _instance = init(gameSize, dimensions, padding);
            }

            return _instance;
        }
    };
})();
