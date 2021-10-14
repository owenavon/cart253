
// October 14th
// Owen Avon

// Live coding session

"use strict";

let clown = undefined

let state = `start`; // start or simulation

let startInstructionTimer = 90;
let startInstructionsVisible = false;

let shape = {
  x: 100,
  y: 250,
  size: 50,
  ax: 0,
  ay: 0,
  vx: 0,
  vy: 0,
  friction: 0.99,
  maxSpeed: 20
};

function preload() {
  clown = loadImage(`assets/images/clown.png`);
}

// Description of setup()
function setup() {
  createCanvas(500, 500);

  setTimeout(showInstruction, 2000);
}

function showInstruction() {
  startInstructionsVisible = true;
}

// Description of draw()
function draw() {
  if(state === `start`) {
    start();
  }
  else if (state === `simulation`) {
    simulation();
  }
}

function start() {
  background(0);

  // startInstructionTimer -= 1;
  // if(startInstructionTimer <= 0) {
  //   startInstructionsVisible = true;
  // }

  if(startInstructionsVisible) {
    push();
    textAlign(CENTER, CENTER);
    fill(255);
    background(0);
    text(`CLICK TO BEGIN`, width/2, height/2);
    pop();
  }
}

function simulation() {
  background(clown);

  handleInput();
  moveShape();
  displayShape();
}

function handleInput() {
  if (keyIsDown(RIGHT_ARROW)) {
    shape.ax = 0.05;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    shape.ax = -0.05;
  }
  else {
    shape.ax = 0;  }
}

function moveShape() {
  shape.vx += shape.ax;
  shape.vy += shape.vy;

  shape.vx *= shape.friction;
  shape.vy *= shape.friction;

  shape.vx = constrain(shape.vx, -shape.maxSpeed, shape.maxSpeed);
  shape.vy = constrain(shape.vy, -shape.maxSpeed, shape.maxSpeed);

  shape.x += shape.vx;
  shape.y += shape.vy;
}

function displayShape() {
  push();
  noStroke();
  fill(255);
  ellipse(shape.x, shape.y, shape.size);
  pop();
}

function mousePressed() {
  if(state === `start` & startInstructionsVisible) {
    state = `simulation`;
  }
}

// shape.x -= shape.vx
// shape.y -= shape.vy
// shape.vx = 0;
// shape.vy = 0;
// shape.ax = 0;
// shape.ay = 0;
