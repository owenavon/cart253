
// Experimenting with p5.sound
// Owen Avon

// Learning and experimenting p.5 sound

"use strict";

let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

// Description of setup()
function setup() {
  createCanvas(600, 600);
  userStartAudio(); // Good practice to include when playing sounds within a program
}

// Description of draw()
function draw() {
  background(0);

  let newRate = map(mouseX, 0, width, -3, 3);
  barkSFX.rate(newRate);
}

function mousePressed() {
  barkSFX.play();
}
