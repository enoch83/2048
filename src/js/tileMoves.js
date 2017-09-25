Tile.prototype.canMoveLeft = function() {
    // a tile at position 0 on x-axis can never be moved left
    if (this.x === 0) return 0;

    // check all 'columns' to the left of the tile
    // as soon as there is a tile, break the loop
    var x;
    for (x = this.x; x > 0; x--) {
        if (this.tileMap.hasTile(this.y, x - 1)) {
            if (this.tileMap.getTile(this.y, x - 1).value === this.value) {
                x -= 1;
            }
            break;
        }
    }

    // return the diff between currnet x and new x(number of steps)
    return this.x - x;
};

// delete the tile from the tiles map
// update current x to new based on number of steps to move
// set the new tile in the tile map
// render the tile
Tile.prototype.moveLeft = function(steps) {
    if (this.tileMap.hasTile(this.y, this.x - steps)) {
        var tempTile = this.tileMap.getTile(this.y, this.x - steps);
        tempTile.destroy();

        this.tileMap.deleteTile(this.y, this.x - steps);
        this.value = this.value * 2;

        var event = new CustomEvent('scoreUpdate', { detail: this.value });
        window.dispatchEvent(event);
    }

    this.tileMap.deleteTile(this.y, this.x);

    this.x = this.x - steps;
    this.tileMap.setTile(this.y, this.x, this);
    this.render();
};

Tile.prototype.canMoveRight = function() {
    var dimensions = this.helper.getDimentions() - 1;
    // a tile at position equal number of columns - 1 on x-axis can never be moved to right
    if (this.x === dimensions) return 0;

    var x;
    for (x = this.x; x < dimensions; x++) {
        if (this.tileMap.hasTile(this.y, x + 1)) {
            if (this.tileMap.getTile(this.y, x + 1).value == this.value) {
                x += 1;
            }
            break;
        }
    }

    return x - this.x;
};

Tile.prototype.moveRight = function(steps) {
    if (this.tileMap.hasTile(this.y, this.x + steps)) {
        var tempTile = this.tileMap.getTile(this.y, this.x + steps);
        tempTile.destroy();

        this.tileMap.deleteTile(this.y, this.x + steps);
        this.value = this.value * 2;

        var event = new CustomEvent('scoreUpdate', { detail: this.value });
        window.dispatchEvent(event);
    }

    this.tileMap.deleteTile(this.y, this.x);
    this.x = this.x + steps;
    this.tileMap.setTile(this.y, this.x, this);
    this.render();
};

Tile.prototype.canMoveUp = function() {
    // a tile at position 0  on y-axis can nevver be moved up
    if (this.y === 0) return 0;

    var y;
    for (y = this.y; y > 0; y--) {
        if (this.tileMap.hasTile(y - 1, this.x)) {
            if (this.tileMap.getTile(y - 1, this.x).value == this.value) {
                y -= 1;
            }
            break;
        }
    }

    return this.y - y;
};

Tile.prototype.moveUp = function(steps) {
    if (this.tileMap.hasTile(this.y - steps, this.x)) {
        var tempTile = this.tileMap.getTile(this.y - steps, this.x);
        tempTile.destroy();

        this.tileMap.deleteTile(this.y - steps, this.x);
        this.value = this.value * 2;

        var event = new CustomEvent('scoreUpdate', { detail: this.value });
        window.dispatchEvent(event);
    }

    this.tileMap.deleteTile(this.y, this.x);
    this.y = this.y - steps;
    this.tileMap.setTile(this.y, this.x, this);
    this.render();
};

Tile.prototype.canMoveDown = function() {
    var dimensions = this.helper.getDimentions() - 1;

    if (this.y === dimensions) return 0;

    var y;
    for (y = this.y; y < dimensions; y++) {
        if (this.tileMap.hasTile(y + 1, this.x)) {
            if (this.tileMap.getTile(y + 1, this.x).value == this.value) {
                y += 1;
            }
            break;
        }
    }

    return y - this.y;
};

Tile.prototype.moveDown = function(steps) {
    if (this.tileMap.hasTile(this.y + steps, this.x)) {
        var tempTile = this.tileMap.getTile(this.y + steps, this.x);
        tempTile.destroy();

        this.tileMap.deleteTile(this.y + steps, this.x);
        this.value = this.value * 2;

        var event = new CustomEvent('scoreUpdate', { detail: this.value });
        window.dispatchEvent(event);
    }

    this.tileMap.deleteTile(this.y, this.x);
    this.y = this.y + steps;
    this.tileMap.setTile(this.y, this.x, this);
    this.render();
};
