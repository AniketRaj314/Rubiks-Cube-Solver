let width, height, vidWidth, vidHeight, scan, cubeWidth, centerX, centerY;
let smallCubeWidth, blocks;
function setup() {
    width = innerWidth;
    pixelDensity(10);
    height = innerHeight - 4;
    vidWidth = 500;
    vidHeight = 406;
    smallCubeWidth = 90;
    cubeWidth = width / 3;
    centerX = width / 2;
    centerY = height / 2;
    blocks = [];
    createCanvas(width, height);
    video = createCapture(VIDEO);
    video.size(vidWidth, vidHeight);
    video.hide();
    scan = createButton('Scan Rubiks Cube');
    scan.position(width / 2 - 75, height - 80);
    scan.style("height", "30px");
    scan.style("width", "150px");
    scan.mousePressed(getColours);
    generateMiniCube();
}

function draw() {
    background(150);
    imageMode(CENTER);
    translate(width, 0);
    scale(-1, 1);
    fill(0, 0, 0, 0);
    rectMode(CENTER);
    rect(width / 2, height / 2, vidWidth, vidHeight);
    image(video, width / 2, height / 2, vidWidth, vidHeight);
    drawCube();
    centers = generateCenters();
    fill(0);
    video.loadPixels();
    for(const center of centers) {
        center.x = map(center.x, 0, vidWidth, 0, width);
        center.y = map(center.y, 0, vidHeight, 0, height);
        point(center.x, center.y);
    }
    for(const block of blocks) {
        block.show();
    }
}

function generateMiniCube() {
    centers = generateCenters();
    let y = smallCubeWidth / 3;
    for(let i = 0; i < 3; i++) {
        let x = centerX - smallCubeWidth / 3;
        for(let j = 0; j < 3; j++) {
            blocks.push(new Block(x, y, [0, 0, 0, 0]));
            x += smallCubeWidth / 3;
        }
        y += smallCubeWidth / 3;
    }
}

function drawCube() {
    strokeWeight(2);
    rect(centerX, centerY, cubeWidth, cubeWidth);

    line(centerX - cubeWidth / 2, centerY - cubeWidth / 6, centerX + cubeWidth / 2, centerY - cubeWidth / 6);
    line(centerX - cubeWidth / 2, centerY + cubeWidth / 6, centerX + cubeWidth / 2, centerY + cubeWidth / 6);

    line(centerX - cubeWidth / 6, centerY - cubeWidth / 2, centerX - cubeWidth / 6, centerY + cubeWidth / 2);
    line(centerX + cubeWidth / 6, centerY - cubeWidth / 2, centerX + cubeWidth / 6, centerY + cubeWidth / 2);
}

function generateCenters() {
    centers = [];
    let y = centerY - cubeWidth / 3;
    for(let i = 0; i < 3; i++) {
        let x = centerX - cubeWidth / 3;
        for(let j = 0; j < 3; j++) {
            newx = map(x, 0, width, 0, 500);
            newy = map(y, 0, height, 0, 406);
            centers.push(createVector(newx, newy));
            x += cubeWidth / 3;
        }
        y += cubeWidth / 3;
    }
    return centers;
}

function getColours() {
    centers = generateCenters();
    let ctr = 0;
    for(const center of centers) {
        let colour = video.get(center.x, center.y);
        console.log(colour);
        blocks[ctr].setColour(colour);
        ctr++;
    }
}

class Block {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
    }

    setColour(colour) {
        this.colour = colour;
    }

    show() {
        fill(...this.colour);
        rect(this.x, this.y, smallCubeWidth / 3, smallCubeWidth / 3);
    }
}