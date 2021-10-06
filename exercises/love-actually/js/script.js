
// Exercise 03: Love Actually
// Owen Avon

// The pupose of this exercise is to practice using all aquired JS knowledge thus far.

//Plan


"use strict";

let circle1 = {
  x: undefined,
  y: 250,
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
  ax: 0,
  ay: 0,
  acceleration: 0.1,
  minSpeed: 1,
  maxSpeed: 10,
  speed: 2
};

let timer = 10

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

  // else if (state === `safety`) {
  //   safety ();
  // }
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
  circleTwoControl();
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

  // Allows circle 1 to move
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  // Constrian for circle 1
  circle1.x = constrain(circle1.x, 0, width);
  circle1.y = constrain(circle1.y, 0, height);
}

function circleTwoControl () {
  if (circle2.x > width) {
    circle2.vx = -circle2.vx;
    circle2.ax = circle2.ax + -circle2.acceleration;
    circle2.size = random(circle2.minSize, circle2.maxSize);
  }
  if (circle2.x < 0) {
    circle2.vx = -circle2.vx;
    circle2.ax = circle2.ax + circle2.acceleration;
    circle2.size = random(circle2.minSize, circle2.maxSize);
  }
  if (circle2.y > height) {
    circle2.vy = -circle2.vy;
    circle2.ay = circle2.ay + -circle2.acceleration;
    circle2.size = random(circle2.minSize, circle2.maxSize);
  }
  if (circle2.y < 0) {
    circle2.vy = -circle2.vy;
    circle2.ay = circle2.ay + circle2.acceleration;
    circle2.size = random(circle2.minSize, circle2.maxSize);
  }

  // Acceleration and constrian of circle 2
  circle2.vx = circle2.vx + circle2.ax;
  circle2.vx = constrain(circle2.vx, -circle2.maxSpeed, circle2.maxSpeed);
  circle2.vy = circle2.vy + circle2.ay;
  circle2.vy = constrain(circle2.vy, -circle2.maxSpeed, circle2.maxSpeed);

  // Allows circle 2 to move
  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

function gameTimer () { // REVIEW THIS and make a state arise
  push();
  textSize(100);
  fill(200, 100, 100);
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

// function checkOffscreen () {
//   // Check if the circles have gone off the screen
//   if (isOffscreen(circle1) || isOffscreen(circle2)) {
//     // SAD ENDING
//     state = `sadness`;
//   }
// }
//
// function isOffscreen(circle) {
//   if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
//     return true;
//   }
//   else {
//     return false;
//   }
// }

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
}
