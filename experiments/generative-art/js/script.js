/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let rectangle = {
  x: 255,
  y: 255,
  size: 200,
  angle: 0
};

/**
Description of setup
*/
function setup() {
createCanvas(500, 500);

// rectangle.vx = 5
// rectangle.vy = 5

}

/**
Description of draw()
*/
function draw() {

  background(0);

  noFill();
  stroke(255);
  rectMode(CENTER);

  translate(rectangle.x, rectangle.y);
  rotate(rectangle.angle);
  rect(0, 0, rectangle.size,);

  rectangle.angle += 0.02;

  // rectangle.x = rectangle.x + rectangle.vx;
  // rectangle.y = rectangle.y + rectangle.vy;

  // rectangle.sizeAngle = rectangle.sizeAngle + 0.15;
  // rectangle.size = rectangle.size + map(sin(rectangle.sizeAngle),-1, 1, 10, 100);

  // rectMode(CENTER);
  // noFill();
  // stroke(rectangle.shade);
  // translate(rectangle.x, rectangle.y);
  // rotate(rectangle.sizeAngle);
  // rect(0, 0, rectangle.x, rectangle.y, rectangle.size);

}
