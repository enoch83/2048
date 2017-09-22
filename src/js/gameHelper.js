var GameHelper = function(gameSize, dimensions, padding) {
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

    return {
        calcSquareSize,
        calcTop,
        calcLeft
    };
};
