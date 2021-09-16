/**
Introducing Variables
Owen Avon

This exercise introduces variables
*/

"use strict";

let backgroundShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 200;
let circleSpeed = 2;
let circleAcceleration = 0.25;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);
  // createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Draw() draws the functions at 60 FPS.
function draw() {
  background(backgroundShade);
  circleX = circleX + circleSpeed;
  circleSpeed = circleSpeed + circleAcceleration; // optional shortform. circleSpeed += circleAcceleration;
  ellipse(circleX, circleY, circleSize);

  // backgroundShade = backgroundShade + 1;
  // circleSize = circleSize * 1.01;
  // circleY = circleY / 1.01;
  // rect(mouseX, mouseY);
  // rectMode(CENTER);
  // rect(width / 2, height / 2, 100, 100);
}
