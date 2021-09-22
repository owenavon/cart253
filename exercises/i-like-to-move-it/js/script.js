/**
i-like-to-move-it
Owen Avon

This program explores the animation shapes and backgrounds.
*/

"use strict";

let bg = {
  r: 128,
  g: 128,
  b: 128,
};

let redCircle = {
  x: 250,
  y: 250,
  size: 100,
  growthRate: 1.5,
  speed: 1,
  stroke: 0,
  fill: 128,
  alpha: 200
};

let whiteC = {
  x: 250,
  y: 0,
  size: 75,
  sizeRatio: 0.75,
  speed: 1.5,
  stroke: 50,
  fill: 0,
  alpha: 0,
};

//setup()
//
// Description of setup() goes here.

function setup() {
  createCanvas(500, 500);
}

// draw()
//
// Description of draw() goes here

function draw() {
  // Background

  background(bg.r, bg.g, bg.b);

  bg.r, bg.g, bg.b = map(redCircle.size, 100, width, 0, 128);
  bg.r = bg.r + 1, bg.g = bg.g + 1, bg.b = bg.b +1;

  // Red Circle
  redCircle.x = redCircle.x + redCircle.speed;
  redCircle.x = constrain(redCircle.x, 0, width / 2);
  redCircle.size = redCircle.size + redCircle.growthRate;
  redCircle.size = constrain(redCircle.size, 0, width);
  fill(redCircle.fill, redCircle.alpha);
  strokeWeight(redCircle.stroke);
  ellipse(redCircle.x, redCircle.y, redCircle.size);

  // White C
  whiteC.y = whiteC.y + whiteC.speed;
  whiteC.y = constrain (whiteC.x, 0, whiteC.y, width);
  whiteC.size = redCircle.size * whiteC.sizeRatio;
  fill(whiteC.fill, whiteC.alpha);
  strokeWeight(whiteC.stroke);
  arc(whiteC.x, whiteC.y, whiteC.size, 375, PI / 2, 3 * PI / 2, OPEN); // 180 degrees
  arc(mouseX, 0, mouseX, 100);
  // ellipse(whiteC.x, whiteC.y, whiteC.size);
}
