// Experimenting with p5.sound
// Owen Avon

// Learning and experimenting p.5 sound

"use strict";

let oscillator;
// let angle = 0;

let t = 0;

// Description of setup()
function setup() {
  createCanvas(600, 600);
  userStartAudio(); // Good practice to include when playing sounds within a program

  oscillator = new p5.Oscillator(440, `sine`);
  oscillator.amp(0.2);
}

// Description of draw()
function draw() {
  background(0);

  // let sinAngle = sin(angle); // Calculate the sin of current angle (0).
  let noiseValue = noise(t); // Create a time step. Oscilaties in an orgnic way. Plays between the values of 0 and 1. Calclates at 0.
  let newFreq = map(noiseValue, 0, 1, 20, 2000); // Map frequency to angle.
  oscillator.freq(newFreq);

  t = t + 0.05; // Inrease t everytime

  // angle = angle + 0.1;

  // let newFreq = map(mouseY, height, 0, 20, 20000);
  // push();
  // textSize(32);
  // textAlign(LEFT, CENTER);
  // fill(255);
  // text(newFreq, 100, height / 2);
  // pop();

  // let newAmp = map(mouseX, 0, width, 0, 1);
  // oscillator.amp(newAmp);
}

function mousePressed() {
  oscillator.start(); // signalling to now be able to play
}

function mouseReleased() {
  oscillator.stop();
}
