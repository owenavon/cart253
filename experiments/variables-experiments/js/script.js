/**
Introducing Variables
Owen Avon

This exercise introduces variables
*/

"use strict";

let backgroundShade = 0;
let circleX = 250;
let circleY = 250;
let circleSize = 100;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);
  // createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(backgroundShade);
  ellipse(circleX, circleY, circleSize);
  // rect(mouseX, mouseY);
  // rectMode(CENTER);
  // rect(width / 2, height / 2, 100, 100);
}
