/********************************************************
drawing-experiments - Exercise
Owen Avon

Experimenting with p5's drawing and colour functions.
*********************************************************/

"use strict";

// preload()
//
// Does nothing.
function preload() {}

// setup()
//
// Draws a face on the canvas
function setup() {
  // Canvas size - 500 X 500 pixels
  createCanvas(500, 500);

  // r, g, b
  background(191, 255, 199);

  // Function - arguments go inside parentheses
  // point(250, 250);

  // Drawn relative to the top left
  // rect(0, 0, 250, 250);

  // Top left to bottom right
  // line(0, 0, 500, 500);

  // Top right to bottom left
  // line(500, 0, 0, 500);

  // x, y, w, h - Drawn realtive to the center
  // ellipse(250, 250, 100, 100);

  // Drawn releative from the cnetre of the rectangle
  // rectMode(CENTER);
  // rect(250, 250, 100, 100);
  // rect (250, 250, 80, 80);
  // rect (250, 250, 60, 60);

  ellipseMode(CORNER);

  noStroke();

  // First cone
  fill(127, 0, 200, 100);
  ellipse(250, 250, 100, 100);

  // Second cone
  fill(137, 0, 210, 100);
  ellipse(250, 250, 80, 80);

  // Third cone
  fill(147, 0, 220, 100);
  ellipse(250, 250, 60, 60);

  // Fouth cone
  fill(157, 0, 230, 100);
  ellipse(250, 250, 40, 40);

  // Fifth cone
  fill(167, 0, 240, 100);
  ellipse(250, 250, 20, 20);

  // triangle(200, 200, 300, 100, 400, 200);
  // Left coordinate, top coordinate, right coordinate
  // strokeWeight(10);
  // stroke(150);
  // line(100, 25, 400, 100);
}

// draw()
//
// Does nothing.
function draw() {

}
