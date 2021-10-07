
// Exercise 03: Love Actually
// Owen Avon

// The pupose of this exercise is to practice using all aquired JS knowledge thus far.

//Plan

"use strict";

let link = {
  x: undefined,
  y: 700,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5
};

let zelda = {
  x: undefined,
  y: 250,
  size: 100,
  minSize: 25,
  maxSize: 125,
  vx: 0,
  vy: 0,
  speed: 5,
  tx: 0,
  ty: 10,
  segmentSize: 100
};

let bgImages = {
  grass: undefined,
  space: undefined,
  escape: undefined,
  winner: undefined,
}

let characterImages = {
  x: 0,
  y: 0,
  size: 125,
  link: undefined,
  zelda: undefined
}

let eightBitFont;
let timer = 20
let state = `title`; // Can be: title, simulation, loser, winner, escape

function preload() {
  bgImages.grass = loadImage("assets/images/grass.png");
  bgImages.space = loadImage("assets/images/space.gif");
  bgImages.escape = loadImage("assets/images/escape.png");
  bgImages.winner = loadImage("assets/images/winner.png");
  characterImages.link = loadImage("assets/images/link.png");
  characterImages.zelda = loadImage("assets/images/zelda.png");

  eightBitFont = loadFont("assets/font/8-bit-pusab.ttf")
}

function setup() {
  createCanvas(750, 750);
  setupCircles();
}

function setupCircles () {
  // Position circles sperated from one another.
  link.x = width / 3;
  zelda.x = 2 * width / 3;
}

function draw() {

  if (state === `title`) {
    title();
  }
  else if (state === `simulation` ) {
    simulation ();
  }
  else if (state === `loser`) {
    loser ();
  }

  else if (state === `winner`) {
    winner ();
  }

  else if (state === `escape`) {
    escape ();
  }
}

function title () {
  push();
  background(bgImages.space);
  textSize(30);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  textFont(eightBitFont);
  text(`Can you avoid the enemy?`, width / 2, height / 2.75);
  text(`Press "P" to play`, width / 2, height / 2);
  pop();
}

function simulation () {
  background(bgImages.grass);
  circleOneControl();
  circleTwoMovement();
  gameTimer();
  checkOverlap();
  display();
}

function loser () {
  push();
  background (0);
  textSize(100);
  fill(255, 0, 0);
  textFont(eightBitFont);
  textAlign(CENTER, CENTER);
  text(`GAME OVER`, keyCode, width / 2.6, height / 1.15);
  pop();
}

function winner () {
  push();
  background(bgImages.winner);
  textSize(32);
  fill(255);
  textFont(eightBitFont);
  textAlign(CENTER, CENTER);
  text(`You've survived the enemy!`, keyCode, width / 2, height / 1.2);
  pop();
}

function escape () {
  push();
  background(bgImages.escape);
  fill(255);
  textFont(eightBitFont);
  textAlign(CENTER);
  textSize(32);
  text(`You've managed to flee`, keyCode, width / 5, height / 1.1);
  pop();
}

function circleOneControl () {
  let dx = link.x - mouseX;
  let dy = link.y - mouseY;

  if (dx < 0) {
    link.vx = -link.speed;
  }
  else if (dx > 0) {
    link.vx = link.speed;
  }
  if (dy < 0) {
    link.vy = -link.speed;
  }
  else if (dy > 0) {
    link.vy = link.speed;
  }

  link.x = link.x + link.vx; // Allows circle 1 to move
  link.y = link.y + link.vy;

  link.x = constrain(link.x, 0, 655); // Constrian for circle 1
  link.y = constrain(link.y, 0, 680);
}

function circleTwoMovement () { // Allows zelda to move in regards to noise
  zelda.x = map(noise(zelda.tx), 0, 1, 0, width);
  zelda.y = map(noise(zelda.ty), 0, 1, 0, height);

  zelda.tx = zelda.tx + 0.02;
  zelda.ty = zelda.ty + 0.02;

  let x = zelda.x;
  let numSegments = 5;

  for (let i = 0; i < numSegments; i++) {
    image(characterImages.zelda, x, zelda.y, zelda.segmentSize);
    x = x + 75;
  }
}

function gameTimer () { // REVIEW THIS and make a state arise
  push();
  fill(255);
  textFont(eightBitFont);
  textAlign(CENTER, TOP);
  textSize(64);
  text(timer, width / 5, height / 5.5);
  pop();

  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
    // WINNER ENDING
    state = `winner`;
  }
}

function checkOverlap () {  // Check if the circles overlap
  let d = dist(link.x, link.y, zelda.x, zelda.y);
  if (d < link.size / 2 + zelda.size / 2) {
    state = `loser`;
  }
}

function display () {
  image(characterImages.link, link.x, link.y, link.size); // Displays the link character
  image(characterImages.zelda, zelda.x, zelda.y, zelda.size); // Displays the zelda character
}

function keyPressed () {
  if (keyCode === 80 && state === `title`) {
    state = `simulation`;
  }
  else if (keyCode === 27 && state === `simulation`) {
    state = `escape`;
  }
}
