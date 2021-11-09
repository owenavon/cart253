// Experimenting with p5.sound
// Owen Avon

// Learning and experimenting p.5 sound

"use strict";

let mic;
let ghost = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  image: undefined
};

// let synth;
// let notes = [`F2`, `G2`, `Ab3`, `Bb3`, `C3`, `Db3`, `Eb3`, `F3`]; // F-minor
// let currentNote = 0;

function preload() {
  ghost.image = loadImage(`assets/images/clown.png`);
}

// Description of setup()
function setup() {
  createCanvas(600, 600);

  ghost.x = width / 2;
  ghost.y = height / 2;

  // synth = new p5.PolySynth();

  mic = new p5.AudioIn();
  mic.start();

  // userStartAudio(); // Good practice to include when playing sounds within a program
}

// Description of draw()
function draw() {
  background(0);

  // Trembling
  ghost.x = ghost.x + random(-1, 1);
  ghost.y = ghost.y + random(-1, 1);

  // Get microphone volume
  let level = mic.getLevel();

  // Check if the ghost is scared
  if (level > 0.6) {
    // Exit at stage right
    ghost.vx = 20;
  }

  // Move the ghost
  ghost.x = ghost.x + ghost.vx;
  ghost.y = ghost.y + ghost.vy;

  // Display the ghost
  push();
  imageMode(CENTER);
  tint(255, 50);
  image(ghost.image, ghost.x, ghost.y);
  pop();

  // let size = map(level, 0, 1, 0, width);
  //
  // push();
  // fill(255, 0, 0);
  // noStroke();
  // ellipse(width / 2, height / 2, size);
}

// function keyPressed() {
//   // Start the ghost player
//   setInterval(playRandomNote, 500);
// }
//
// function playRandomNote() {
//   let note = notes[currentNote];
//   synth.play(note, 1, 0, 0.3);
//
//   currentNote = currentNote + 1;
//   if (currentNote === notes.length) {
//     currentNote = 0;
//   }
// }

// function mouseReleased() {
//   oscillator.stop();
// }
