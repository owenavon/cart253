// i-like-to-move-it
// Owen Avon

// This program replicate the Concordia logo, while adding interactivity.

// Idea / Plan
// Replicate the Concordia logo, while adding interactivity.
// 1) Craeted a canvass.
// 2) Create a red circle.
// 3) Create an opaque circle for interactivity.
// 4) Create a "C" shape from "arc".
// 5) Attempt to rotate the C shape. (Please see comments near the bottom of the page.)

"use strict";

// Setting variables within objects.

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
  alpha: 500,
};

let tintEllipse = {
  x: 250,
  y: 250,
  size: 100,
  weight: 0,
  fill: 255,
  alpha: 100,
  canvassSize: 500
};

let whiteC = {
  x: 125,
  y: 0,
  size: 100,
  sizeRatio: 0.75,
  speed: 1.5,
  weight: 40,
  letterHeight: 375,
  letterColour: 255,
  fill: 128,
  alpha: 0,
  angle: 0,
  circumferencetop: 3.15,
  circumferenceBottom: 2.4
};

// First function that is called when the program starts up.
function setup() {
  createCanvas(500, 500);
}

// Location where code is excuted.
function draw() {

  // Background
  background(bg.r, bg.g, bg.b); // Displays Canvass background colour.
  bg.r = bg.r + bg.fps, bg.g = bg.g + bg.fps, bg.b = bg.b + bg.fps; // Allows the canvass colour to fade from grey to white.

  // Red Circle
  redCircle.size = redCircle.size + redCircle.growthRate; // Allows red circle to grow to canvass size.
  redCircle.size = constrain(redCircle.size, 0, width); // Constrains red circle to canvass size.
  fill(redCircle.r, redCircle.g, redCircle.b); // Makes the circle burgundy in colour.
  strokeWeight(redCircle.weight); // Removes the circle's stroke.
  ellipse(redCircle.x, redCircle.y, redCircle.size); // Draws the red circle (Ellipse).

  // Tinted Ellipse
  tintEllipse.fill = map(mouseY, width / 4, height, 0, tintEllipse.canvassSize); // Allows user to move mouse vetically to adjust tinted ellipse's opacity.
  tintEllipse.size = map(mouseX, height, 0, 50, tintEllipse.canvassSize); // Allows user to move mouse horizontally to adjust tinted ellipse's size.
  tintEllipse.size = constrain(tintEllipse.size, 0, tintEllipse.canvassSize); // Prevents the tinted ellipse from becoming larger then the canvass.
  fill(tintEllipse.fill, tintEllipse.alpha); // Makes the tinted ellipse grey in colour and provides an opcaity so that the below red circle can be seen.
  strokeWeight(tintEllipse.weight); // Removes the tinted ellipse stroke.
  ellipse(tintEllipse.x, tintEllipse.y, tintEllipse.size); // Draws the tinted circle (Ellipse) and provides size dimension.

  // White "C
  whiteC.y = whiteC.y + whiteC.speed; // Allows the "C" to vertically translate onto the canvass.
  whiteC.y = constrain (whiteC.y, 0, whiteC.x,); // Prevents the "C" from translating off of the canvass.
  whiteC.size = redCircle.size * whiteC.sizeRatio; // Makes the "C" shape relative to the red circle shape.
  fill(whiteC.fill, whiteC.alpha); // Makes the arc ("C") fill grey, however the opacity is then set to 0 so that the fill is not seen.
  stroke(whiteC.letterColour); // Makes the "C"'s stroke white in colour.
  strokeCap(SQUARE); // Makes the end of the "C"s square instead of the default round edges.
  strokeWeight(whiteC.weight); // Provides the "C"s stroke weight, and ultimately allows the "C" to be seen.
  translate(whiteC.x, whiteC.y); // Provides coordinates for the resting postion of the "C".

  // I was attempting to make the C rotate inside of the red circle. Unlike, rectangle or ellipse I could not find a function to CENTER the origin of an arc.
  // If you uncomment the code, you will notice that the rotation does in fact work, however it is based off the top left corner of the C. I spent many hours trying to fix this...

  // rotate(whiteC.angle);
  // arc(whiteC.x, whiteC.y, whiteC.size,);
  // whiteC.angle = whiteC.angle + 0.02;

  arc(whiteC.x, whiteC.y, whiteC.size, whiteC.letterHeight, PI / whiteC.circumferenceBottom, whiteC.circumferencetop * PI / 2, OPEN); // Creates C shape with arc function.
}
