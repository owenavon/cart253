
// Exercise 03: Love Actually
// Owen Avon

// The pupose of this exercise is to practice using all aquired JS knowledge thus far.

//Plan


"use strict";

let circle1 = {
  x: undefined,
  y: 425,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 4
};

let circle2 = {
  x: undefined,
  y: 250,
  size: 100,
  minSize: 25,
  maxSize: 125,
  vx: 0,
  vy: 0,
  speed: 5,
  tx: 0,
  ty: 10
};

let timer = 15

let state = `title`; // Can be: title, simulation, louser, winner, safety

// Description of setup()
function setup() {
  createCanvas(500, 500);
  setupCircles();
}

function setupCircles () {
  // Position circles sperated from one another.
  circle1.x = width / 3;
  circle2.x = 2 * width / 3;

  // Start circles moving in a random direction.
  circle1.vx = random (-circle1.speed, circle1.speed);
  circle2.vx = random (-circle2.speed, circle2.speed);

  circle1.vy = random (-circle1.speed, circle1.speed);
  circle2.vy = random (-circle2.speed, circle2.speed);
}

// Description of draw()
function draw() {
  background (0);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation` ) {
    simulation ();
  }
  else if (state === `louser`) {
    louser ();
  }

  else if (state === `winner`) {
    winner ();
  }

  else if (state === `safety`) {
    safety ();
  }
}

function title () {
  push();
  textSize(30);
  fill(200, 100, 100);
  textAlign(CENTER,CENTER);
  text(`Stay away from the crazy lover!`, width / 2, height / 2.75);
  text(`Press "P" to play!`, width / 2, height / 2);
  pop();
}

function simulation () {
  circleOneControl();
  circleTwoMovement();
  gameTimer();
  checkOverlap();
  display();
}

function louser () {
  push();
  textSize(30);
  fill(255, 150, 150);
  textAlign(CENTER,CENTER);
  text(`Caught by the crazy lover!`, keyCode, width / 2, height / 2);
  pop();
}

function winner () {
  push();
  textSize(30);
  fill(255, 150, 150);
  textAlign(CENTER,CENTER);
  text(`You survived the Crazy Lover!`, keyCode, width / 2, height / 2);
  pop();
}

function safety () {
  push();
  textSize(30);
  fill(255, 150, 150);
  textAlign(CENTER,CENTER);
  text(`Hmm!`, keyCode, width / 2, height / 2);
  pop();
}

function circleOneControl () {
  let dx = circle1.x - mouseX;
  let dy = circle1.y - mouseY;

  if (dx < 0) {
    circle1.vx = -circle1.speed;
  }
  else if (dx > 0) {
    circle1.vx = circle1.speed;
  }
  if (dy < 0) {
    circle1.vy = -circle1.speed;
  }
  else if (dy > 0) {
    circle1.vy = circle1.speed;
  }

  circle1.x = circle1.x + circle1.vx; // Allows circle 1 to move
  circle1.y = circle1.y + circle1.vy;

  circle1.x = constrain(circle1.x, 0, width); // Constrian for circle 1
  circle1.y = constrain(circle1.y, 0, height);
}

function circleTwoMovement () { // Allows circle2 to move in regards to noise
  circle2.x = map(noise(circle2.tx), 0, 1, 0, width);
  circle2.y = map(noise(circle2.ty), 0, 1, 0, height);

  circle2.tx = circle2.tx + 0.05;
  circle2.ty = circle2.ty + 0.05;
}

function gameTimer () { // REVIEW THIS and make a state arise
  push();
  textSize(100);
  fill(255);
  text(timer, width/2, height/2);
  pop();

  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
    // WINNER ENDING
    state = `winner`;
  }
}

function checkOverlap () {
  // Check if the circles overlap
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size / 2 + circle2.size / 2) {
    // LOUSER ENDING
    state = `louser`;
  }
}

function display () {
  // Display the circles
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
}

function keyPressed () {
  if (keyCode === 80 && state === `title`) {
    state = `simulation`;
  }
  else if (keyCode === 72 && state === `simulation`) {
    state = `safety`;
  }
}
