/**
Introducing Variables
Owen Avon

This exercise introduces variables
*/

"use strict";

let backgroundShade = 0;
// let circleAcceleration = 0.25;

let circle = { // Object
  x: 250, // Properties
  y: 250,
  size: 100,
  speed: 1,
  fill: 0
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

  circle.speed = random(-5, 5);
  circle.x = circle.x + circle.speed;
  circle.y = random(0, height);
  circle.size = random(10, 100);

  circle.fill = random(0, 255);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);

  // let randomNumber = random();
  // console.log(randomNumber);

  // console.log(`circle.x: ${circle.x}, circle.y ${circle.y}, circle.size ${circle.size}, circle.speed ${circle.speed}`); // Template string is the advised way to print information.

  // console.log("circle.x: " + circle.x); // Static text inside ""

  // circleSpeed = circleSpeed + circleAcceleration; // optional shortform. circleSpeed += circleAcceleration;
  // backgroundShade = backgroundShade + 1;
  // circleSize = circleSize * 1.01;
  // circleY = circleY / 1.01;
  // rect(mouseX, mouseY);
  // rectMode(CENTER);
  // rect(width / 2, height / 2, 100, 100);
}
