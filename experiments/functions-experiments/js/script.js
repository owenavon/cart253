
// Experimenting with Functions
// Owen Avon

// Learning and experimenting with Functions

"use strict";

let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0
}

// Description of setup()
function setup() {
  createCanvas(500, 500);
}

// Description of draw()
function draw() {
  background(0);

  move ();
  wrap ();
  display();
}

function move () {
  circle.x = circle.x + circle.vx; // Means the circle moves
  circle.y = circle.y + circle.vy; // Means the circle moves
}

function wrap () {
  if (circle.x > width) {
    reset();
    // circle.x = 0;
    // circle.vx = circle.vx + 2;
    // circle.size = circle.size + 5;
  }
}

function display () {
  fill(255, 0, 0);
  ellipse(circle.x, circle.y, circle.size);
}

function reset () { // Reusable since we used it in both "mousePressed" and in the wrap function.
  circle.x = 0;
  circle.vx = circle.vx + 2;
  circle.vy = circle.vy - 0.25;
  circle.size = circle.size + 5;
}

function mousePressed() {
  reset ();
}

// functions orgainize our code into different sets of instructions and names which is called modularity.
