function Tile(y, x, value) {
    this.y = y;
    this.x = x;
    this.value = value;
    this.tileMap = TileMap.getInstance();
}

Tile.prototype.render = function(size, top, left) {
    // create a div, set id and class
    var div = document.createElement('div');
    //div.id = this.id;
    div.classList.add('tile');
    div.innerHTML = this.value;

    div.style.width = size + 'px';
    div.style.height = size + 'px';

    // set the position of the div.
    div.style.top = top + 'px';
    div.style.left = left + 'px';

    // set background color and font-size based on num
    div.style.background = '#FFFFFF'; //this.backgroundColor();

    var game = document.getElementById('game');
    game.appendChild(div);
};

Tile.prototype.canMoveLeft = function() {
    // a tile at position 0 on x-axis can never be moved left
    if (this.x === 0) return false;

    // check if there is a tile on this.x - 1
    if (this.tileMap.hasTile(this.y, this.x - 1)) {
        var blockingTile = this.tileMap.getTile(this.y, this.x - 1);
        if (blockingTile.value === this.value) {
            console.log('Colliding');
        } else {
            return false;
        }
    }

    return true;
};

Tile.prototype.moveLeft = function() {};
