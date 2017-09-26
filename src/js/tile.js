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
    var divExists = false;
    // try to get the element by id
    if (document.getElementById(this.id)) {
        div = document.getElementById(this.id);
        divExists = true;
    } else {
        // create a div, set id and class
        div = document.createElement('div');
        div.id = this.id;
        div.classList.add('tile');
    }

    div.classList.add('tile-' + this.value);

    div.style.width = size + 'px';
    div.style.height = size + 'px';

    // set the position of the div.
    div.style.top = top + 'px';
    div.style.left = left + 'px';

    if (document.getElementById('span-' + this.id)) {
        var list = document.getElementById('span-' + this.id);
        list.parentNode.removeChild(list);
    }

    span = document.createElement('span');
    span.id = 'span-' + this.id;
    span.innerHTML = this.value;
    div.appendChild(span);

    // If tile not already exist, add to DOM
    if (!divExists) {
        var game = document.getElementById('game');
        game.appendChild(div);
    }
};

Tile.prototype.destroy = function() {
    // remove tile from DOM
    var element = document.getElementById(this.id);
    element.parentNode.removeChild(element);
};
