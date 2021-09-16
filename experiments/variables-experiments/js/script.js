/**
Introducing Variables
Owen Avon

This exercise introduces variables
*/

"use strict";

let backgroundShade = 0;
// let circleAcceleration = 0.25;

let circle = { // Object
  x: 0, // Properties
  y: 250,
  size: 200,
  speed: 2
};

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
  circle.x = circle.x + circle.speed;
  ellipse(circle.x, circle.y, circle.size);

  console.log(`circle.x: ${circle.x}, circle.y ${circle.y}, circle.size ${circle.size}, circle.speed ${circle.speed}`); // Template string is the advised way to print information.

  // console.log("circle.x: " + circle.x); // Static text inside ""

  // circleSpeed = circleSpeed + circleAcceleration; // optional shortform. circleSpeed += circleAcceleration;
  // backgroundShade = backgroundShade + 1;
  // circleSize = circleSize * 1.01;
  // circleY = circleY / 1.01;
  // rect(mouseX, mouseY);
  // rectMode(CENTER);
  // rect(width / 2, height / 2, 100, 100);
}
