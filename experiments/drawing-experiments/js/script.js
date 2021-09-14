/**
drawing-experiments - Exercise
Owen Avon

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/

function setup() {
  createCanvas(500, 500); // Canvas size - 500 X 500 pixels

  background(191, 255, 199); // r, g, b

  // point(250, 250); // Function - arguments go inside parentheses
  // rect(0, 0, 250, 250); // Drawn relative to the top left
  // line(0, 0, 500, 500); // Top left to bottom right
  // line(500, 0, 0, 500); // Top right to bottom left
  // ellipse(250, 250, 100, 100); // x, y, w, h - Drawn realtive to the center

  // rectMode(CENTER); // Drawn releative from the cnetre of the rectangle
  // rect(250, 250, 100, 100);
  // rect (250, 250, 80, 80);
  // rect (250, 250, 60, 60);

  ellipseMode(CORNER);

  noStroke();

  fill(127, 0, 200, 100);
  ellipse(250, 250, 100, 100);

  fill(137, 0, 210, 100);
  ellipse(250, 250, 80, 80);

  fill(147, 0, 220, 100);
  ellipse(250, 250, 60, 60);

  fill(157, 0, 230, 100);
  ellipse(250, 250, 40, 40);

  fill(167, 0, 240, 100);
  ellipse(250, 250, 20, 20);

  // triangle(200, 200, 300, 100, 400, 200); // Left coordinate, top coordinate, right coordinate
  // strokeWeight(10);
  // stroke(150);
  // line(100, 25, 400, 100);
}

/**
Description of draw()
*/
function draw() {}
