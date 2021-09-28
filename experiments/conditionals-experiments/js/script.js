
// Experimenting with Conditionals
// Owen Avon

// Learning and experimenting with conditionals

"use strict";

// let backgroundShade = 0;
// let circle = {
//   x: 0,
//   y: 250,
//   size: 100,
//   speed: 1,
// }

let displayCircle = false; // Don't display circle untill we click on canvas.

// Description of setup()
function setup() {
  createCanvas(500, 500);
}

// Description of draw()
function draw() {

  background(0);

  if (mouseIsPressed) {
    displayCircle = true; // If we click, then display white circle.
  }

  if (displayCircle) {
    ellipse(250, 250, 100, 100);
    }
  }


  // background(backgroundShade);
  //
  // circle.x = circle.x + circle.speed;
  //
  // fill(255, 255, 255);
  //
  // if (!(circle.x < width/3)) {
  //   fill(255, 0, 0);
  // }

  // if (circle.x < width/3 || circle.x > 2 * width/3) {
  //   fill(255, 0, 0);
  // }

  // if (mouseX < width/3) {
  //   fill(255, 0, 0);
  // }
  // else if (mouseX < 2 * width/3) {
  //   fill(0, 255, 0);
  // }
  // else {
  //   fill (0, 0, 255);
  // }

  // ellipse(circle.x, circle.y, circle.size);

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
