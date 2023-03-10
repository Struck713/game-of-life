const screen = { amountOfCells: 45, cellSize: 20 };
const screenSize = screen.amountOfCells * screen.cellSize;

let simulating = false;
let cells = [];

function setup() {
    createCanvas(screenSize, screenSize);

    for (var x = 0; x < screen.amountOfCells; x++) {
        let column = [];
        for (var y = 0; y < screen.amountOfCells; y++) {
            column[y] = new Cell(x, y);
        }
        cells[x] = column;
    }
    
    let simulationButton = createButton("Start simulation");
    simulationButton.mousePressed(() => {
        simulating = !simulating;
        if (simulating) simulationButton.html("Stop simulation");
        else simulationButton.html("Start simulation");
    });

    let clearButton = createButton("Clear grid");
    clearButton.mousePressed(() => {
        cells.forEach(column => column.forEach(cell => {
            cell.alive = false;
            cell.draw();
        }));
    });

    // draw once!
    cells.forEach(column => column.forEach(cell => cell.draw()));
}

function draw() {
    if (simulating) {
        frameRate(5);

        // save their last states
        cells.forEach(column => column.forEach(cell => cell.cache()));
        
        // update the new states!
        cells.forEach(column => column.forEach(cell => {
            cell.draw()
            cell.update();
        }));
    }

}

function mouseClicked() { mouse(); }
function mouseDragged() { mouse(); }

const mouse = () => {
    if (simulating) return;

    let size = screen.cellSize;
    let gridX = floor(mouseX / size);
    let gridY = floor(mouseY / size);
    let clicked = Cell.getCell(gridX, gridY);
    if (!clicked) return;

    clicked.alive = !clicked.alive;
    clicked.draw();
}