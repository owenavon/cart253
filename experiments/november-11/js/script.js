
// Experimenting with p5.sound
// Owen Avon

// Learning and experimenting with p5.sound

"use strict";

let slider = undefined;
let barkSFX = undefined;
let reverb = undefined;
let mic = undefined;

let bird = {
  x: 0,
  y: 200,
  size: 50,
  vx: 0.25,
  vy: 0,
};

function preload() {
  barkSFX = loadSound (`assets/sounds/bark.wav`);
}

function setup() {
  createCanvas(400, 400);

  // slider = createSlider(-2, 2, 1, 0.1);
  // reverb = new p5.Reverb();

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);

  // let value = slider.value();

  let micLevel = mic.getLevel();

  bird.x += bird.vx
  bird.y += bird.vy


  let step = map(micLevel, 0, 1, 0, 5);
  bird.y -= step;

  push();
  fill(255);
  ellipse(bird.x, bird.y, bird.size);
  pop();


  // push();
  // textAlign(CENTER, CENTER);
  // textSize(42);
  // fill(255);
  // text(value, width / 2, height / 2);
  // pop();
}
//
// function mousePressed() {
// }

// function keyPressed() {
//   let value = slider.value();
//   reverb.process(barkSFX, 5, 0);
//   reverb.drywet(value);
//   // barkSFX.rate(value);
//   barkSFX.play();
// }
