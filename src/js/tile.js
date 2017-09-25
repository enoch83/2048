function Tile(y, x, value, id) {
    this.y = y;
    this.x = x;
    this.value = value;

    this.id = id;

    this.tileMap = TileMap.getInstance();
    this.helper = GameHelper.getInstance();
}

Tile.prototype.render = function() {
    var size = this.helper.calcSquareSize();
    var top = this.helper.calcTop(this.y, size);
    var left = this.helper.calcLeft(this.x, size);

    var div;
    var exist = false;
    // try to get the element by id
    if (document.getElementById(this.id)) {
        div = document.getElementById(this.id);
        exist = true;
    } else {
        // create a div, set id and class
        div = document.createElement('div');
        div.id = this.id;
        div.classList.add('tile');
    }

    div.innerHTML = this.value;

    div.style.width = size + 'px';
    div.style.height = size + 'px';

    // set the position of the div.
    div.style.top = top + 'px';
    div.style.left = left + 'px';

    // set background color and font-size based on num
    div.style.background = '#FFFFFF'; //this.backgroundColor();

    //
    if (!exist) {
        var game = document.getElementById('game');
        game.appendChild(div);
    }
};

Tile.prototype.destroy = function() {
    console.log('destroy');
    // remove the old tile
    var element = document.getElementById(this.id);
    element.parentNode.removeChild(element);
};
