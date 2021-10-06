
// Experimenting with Functions
// Owen Avon

// Learning and experimenting with Functions

"use strict";

// let circle = {
//   x: 0,
//   y: 250,
//   size: 100,
//   vx: 1,
//   vy: 0
// }

// Description of setup()
function setup() {
  createCanvas(500, 500);
}

// Description of draw()
function draw() {
  background(0);

  parallels (100, 100, 5, 1, 100, 1);
  parallels (50, 50, 10, 2, 20, 10);
  parallels (200, 200, 15, 7, 3, 20);
  parallels (312, 257, 20, 0.5, 300, 2);
}

function parallels (x, y, numLines, lineWidth, lineHeight, lineSpacing) { // x and y parameters are defined in the function above.
  // let x = 50;
  // let y = 250;
  for (let i = 0; i < numLines; i++) {
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(x, y, lineWidth, lineHeight);
    x = x + lineSpacing;
}

  // move ();
  // wrap ();
  // display();
}

// function move () {
//   circle.x = circle.x + circle.vx; // Means the circle moves
//   circle.y = circle.y + circle.vy; // Means the circle moves
// }
//
// function wrap () {
//   if (circle.x > width) {
//     reset();
//     // circle.x = 0;
//     // circle.vx = circle.vx + 2;
//     // circle.size = circle.size + 5;
//   }
// }
//
// function display () {
//   fill(255, 0, 0);
//   ellipse(circle.x, circle.y, circle.size);
// }
//
// function reset () { // Reusable since we used it in both "mousePressed" and in the wrap function.
//   circle.x = 0;
//   circle.vx = circle.vx + 2;
//   circle.vy = circle.vy - 0.25;
//   circle.size = circle.size + 5;
// }
//
// function mousePressed() {
//   reset ();
// }

// functions orgainize our code into different sets of instructions and names which is called modularity.
