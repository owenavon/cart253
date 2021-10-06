
// Experimenting with Functions
// Owen Avon

// Learning and experimenting with Functions

"use strict";

// let circle = {
//   x: 0,
//   y: 250,
//   size: 100,
//   vx: 1,
//   vy: 0
// }

let hello = {
  string: `Hello, world!`,
  x: 0,
  y: 0,
  vx: 5,
  vy: 1,
  size: 64
}

// Description of setup()
function setup() {
  createCanvas(500, 500);

  // let hotCelsius = toCelsius(100);
  // console.log(`100 degrees Farenheit is ${hotCelsius} degrees Celsius.`);
  //
  // let coldCelsius = toCelsius(10);
  // console.log(`10 degrees Fahrenheit is ${coldCelsius} degrees Celsius.`);
}

// Description of draw()
function draw() {
  background(0);

  hello.x = hello.x + hello.vx;
  hello.y = hello.y + hello.vy;

  hello.size = hello.size + 1;

  textAlign(CENTER, CENTER); // Centered horizontally and vertically to the indicated x and y.
  textSize(hello.size);
  textStyle(BOLD);

  fill(200, 50, 200);
  stroke(50, 200, 50);
  strokeWeight(3);

  text(hello.string, hello.x, hello.y); //text function is used to display text on the screen.

  // let x = random(0, width);
  // let y = random (0, height);
  //
  // ellipse(x, y, 100); // I can call a function where I want to use it's return value.

  // parallels (100, 100, 5, 1, 100, 1);
  // parallels (50, 50, 10, 2, 20, 10);
  // parallels (200, 200, 15, 7, 3, 20);
  // parallels (312, 257, 20, 0.5, 300, 2);
}

// function toCelsius(fahrenheit) { // Function is called signature. Parameter
//   let celsius = (fahrenheit - 32) * 5/9; // Variable
//   return celsius;
// }

// function parallels (x, y, numLines, lineWidth, lineHeight, lineSpacing) { // x and y parameters are defined in the function above.
//   // let x = 50;
//   // let y = 250;
//   for (let i = 0; i < numLines; i++) {
//     noStroke();
//     fill(255);
//     rectMode(CENTER);
//     rect(x, y, lineWidth, lineHeight);
//     x = x + lineSpacing;
// }

  // move ();
  // wrap ();
  // display();
// }

// function move () {
//   circle.x = circle.x + circle.vx; // Means the circle moves
//   circle.y = circle.y + circle.vy; // Means the circle moves
// }
//
// function wrap () {
//   if (circle.x > width) {
//     reset();
//     // circle.x = 0;
//     // circle.vx = circle.vx + 2;
//     // circle.size = circle.size + 5;
//   }
// }
//
// function display () {
//   fill(255, 0, 0);
//   ellipse(circle.x, circle.y, circle.size);
// }
//
// function reset () { // Reusable since we used it in both "mousePressed" and in the wrap function.
//   circle.x = 0;
//   circle.vx = circle.vx + 2;
//   circle.vy = circle.vy - 0.25;
//   circle.size = circle.size + 5;
// }
//
// function mousePressed() {
//   reset ();
// }

// functions orgainize our code into different sets of instructions and names which is called modularity.
