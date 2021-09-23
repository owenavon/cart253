/**
i-like-to-move-it
Owen Avon

This program explores the animation shapes and backgrounds.
*/

"use strict";

let bg = {
  r: 125,
  g: 125,
  b: 125,
  fps:0.5,
};

let redCircle = {
  x: 250,
  y: 250,
  r: 147,
  g: 35,
  b: 57,
  size: 100,
  growthRate: 1.5,
  speed: 1,
  weight: 0,
  fill: 125,
  alpha: 500
};

let tintEllipse = {
  x: 250,
  y: 250,
  size: 100,
  weight: 0,
  fill: 255,
  alpha: 100,
};

let whiteC = {
  x: 250,
  y: 0,
  size: 75,
  sizeRatio: 0.75,
  speed: 1.5,
  weight: 40,
  cHeight: 375,
  letterColour: 255,
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
  bg.r = bg.r + bg.fps, bg.g = bg.g + bg.fps, bg.b = bg.b + bg.fps;

  // Red Circle
  redCircle.x = redCircle.x + redCircle.speed;
  redCircle.x = constrain(redCircle.x, 0, width / 2);
  redCircle.size = redCircle.size + redCircle.growthRate;
  redCircle.size = constrain(redCircle.size, 0, width);
  fill(redCircle.r, redCircle.g, redCircle.b);
  strokeWeight(redCircle.weight);
  ellipse(redCircle.x, redCircle.y, redCircle.size);

  // Tinted Ellipse

  tintEllipse.fill = map(mouseY, width / 4, height, 0, 255);

  tintEllipse.size = map(mouseY, height, 0, 50, 500);

  tintEllipse.size = constrain(tintEllipse.size, 0, 500);

  fill(tintEllipse.fill, tintEllipse.alpha);
  strokeWeight(tintEllipse.weight);
  ellipse(tintEllipse.x, tintEllipse.y, tintEllipse.size);



  // White "C"
  whiteC.y = whiteC.y + whiteC.speed;
  whiteC.y = constrain (whiteC.x, 0, whiteC.y, width);
  whiteC.size = redCircle.size * whiteC.sizeRatio;
  fill(whiteC.fill, whiteC.alpha);
  stroke(whiteC.letterColour);
  strokeWeight(whiteC.weight);
  arc(whiteC.x, whiteC.y, whiteC.size, whiteC.cHeight, PI / 2, 3 * PI / 2, OPEN); // 180 degrees
}
