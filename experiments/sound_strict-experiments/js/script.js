
// Sound and Strict Experiments
// Owen Avon

// Learning and experimenting with sound and the "strict" function.

"use strict";

let circle = {
  x: 0,
  y: 0,
  size: 100
}

// let music;

// function preload() {
//   music = loadSound(`assets/sounds/bark.wav`);
// }

// Description of setup()
function setup() {
  createCanvas(500, 500);
}

// Description of draw()
function draw() {
  background(0);

  circle.x = mouseX;
  circle.y = mouseY;

  ellipse(circle.x, circle.y, 100);

}

// function mousePressed() { // Cannot play music as the broswer loads. This code trys to get around the broswers regulations.
//   tryMusic();
// }
//
// function keyPressed() {
//   tryMusic();
// }
//
// function tryMusic() {
//   if (!music.isPlaying()) {
//     music.loop();
//   }
