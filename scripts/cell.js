class Cell {

    static getCell(x, y) {
        if (x >= 0 && x < screen.amountOfCells && y >= 0 && y < screen.amountOfCells) return cells[x][y];
        return null; 
    }

    static isAlive(x, y) {
        let cell = Cell.getCell(x, y);
        if (cell) return cell.alive;
        return false;
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = false;
    }

    draw() {
        if (this.alive) fill(0);
        else fill(255);

        let size = screen.cellSize;
        square(this.x * size, this.y * size, size);
    }

    update() {
        let neighbors = 0;

        if (Cell.isAlive(this.x - 1, this.y)) neighbors++;
        if (Cell.isAlive(this.x + 1, this.y)) neighbors++;
        if (Cell.isAlive(this.x, this.y - 1)) neighbors++;
        if (Cell.isAlive(this.x, this.y + 1)) neighbors++;
        if (Cell.isAlive(this.x + 1, this.y - 1)) neighbors++;
        if (Cell.isAlive(this.x + 1, this.y + 1)) neighbors++;
        if (Cell.isAlive(this.x - 1, this.y - 1)) neighbors++;
        if (Cell.isAlive(this.x - 1, this.y + 1)) neighbors++;

        if (this.alive) this.alive = (neighbors == 2 || neighbors == 3);
        else this.alive = (neighbors == 3);
    }

}