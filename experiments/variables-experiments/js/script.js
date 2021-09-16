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
  size: 100,
  speed: 1,
  fill: 255
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
  circle.x = constrain(circle.x, 0, width); // Constrain circle.x to the wdith of the screen.

  circle.fill = map(circle.x, 0, width, 0, 255); //Value we want to convert - What it comes from - Range wewould like it to be.
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);

  // circle.size = map(mouseY, height, 0, 50, 500);

  // circle.speed = random(-5, 5);
  // circle.y = random(0, height);
  // circle.size = random(10, 100);
  // circle.fill = random(0, 255);

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
