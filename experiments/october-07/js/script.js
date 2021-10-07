
// October 7th
// Owen Avon

// Live coding session


// Points system
// Random postioning followed by movement
// Using mouse postion to trigger a new state
// noise()
// Rotating an object to face the direction of movement
// Using acceleration with automated movement

"use strict";

let score = 0;

let target = {
  x: undefined,
  y: undefined,
  size: 50,
  vx: undefined,
  vy: undefined,
};

// Description of setup()
function setup() {
  createCanvas(640, 640);

  target.x = random(0, width);
  target.y = random(0, height);
  target.vx = random(-1, -1);
  target.vy = random(-1, -1);
}

// Description of draw()
function draw() {
  background(0);

  score ++;

  target.x += target.vx;
  target.y += target.vy;

  push();
  fill(255);
  noStroke();
  ellipse(target.x, target.y, target.size);
  pop();

  displayScore();

}

function displayScore () {
  push();
  fill(255);
  textAlign(LEFT, TOP);
  textSize(32);
  text(score, width/8, height/8);
  pop();
}
