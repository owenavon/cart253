// Experimenting with p5.sound
// Owen Avon

// Learning and experimenting p.5 sound

"use strict";

let synth;
let notes = [`F2`, `G2`, `Ab3`, `Bb3`, `C3`, `Db3`, `Eb3`, `F3`]; // F-minor
let currentNote = 0;

// let oscillator;
// let angle = 0;
// let t = 0;

// Description of setup()
function setup() {
  createCanvas(600, 600);

  synth = new p5.PolySynth();

  userStartAudio(); // Good practice to include when playing sounds within a program
}

// Description of draw()
function draw() {
  background(0);

}

function keyPressed() {
  // Start the ghost player
  setInterval(playRandomNote, 500);
}

function playRandomNote() {
  let note = notes[currentNote];
  synth.play(note, 1, 0, 0.3);

  currentNote = currentNote + 1;
  if (currentNote === notes.length) {
    currentNote = 0;
  }
}

// function mouseReleased() {
//   oscillator.stop();
// }
