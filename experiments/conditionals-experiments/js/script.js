
// Experimenting with Conditionals
// Owen Avon

// Learning and experimenting with conditionals

"use strict";

let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 1,
}

// Description of setup()
function setup() {
  createCanvas(500, 500);
}

// Description of draw()
function draw() {
  background(backgroundShade);

  circle.x = circle.x + circle.speed;

  ellipse(circle.x, circle.y, circle.size);

  // if (circle.x > width) {
  //   circle.speed = -circle.speed;
  // }
  //
  // if (circle.x < 0) {
  //   circle.speed = -circle.speed;
  // }
  //
  // if (mouseY < height/2) {
  //   fill(255, 0, 0)
  // }
  //
  // if (mouseY > height/2) {
  //   fill(0, 0, 255)
  // }

}
