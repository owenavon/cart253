/**
Mona Lisa
Owen Avon

A program to reproduce the Mona Lisa
*/

"use strict";

// setup()
//
// Draws Mona Lisa on the canvas
function setup() {
  createCanvas(400, 600);
  background(144, 209, 152);
  noStroke();

  // Draw Mona's hair
  fill(50, 10, 10);
  ellipse(210, 180, 180, 240);

  // Draw Mona's face
  fill(219, 195, 114); // functions above ellipse
  ellipse(200, 150, 110, 160);

  // Draw Mona's mouth
  noFill();
  stroke(100, 120, 120);
  strokeWeight(10);
  arc(200, 50, 300, 300, 5.5 * PI / 4 + TWO_PI + PI, 6.5 * PI / 4 + PI, OPEN );

  // Draw Mona's Eye
  ellipse(180, 150, 10, 10);
  ellipse(220, 150, 10, 10);
}

// Description of draw()
// Does nothing.
function draw() {

}
