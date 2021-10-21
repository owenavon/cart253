
// October 21st
// Owen Avon

// Live coding session

"use strict";

let balloons = []; // Our array of balloons
let numBalloons = 5;

// Description of setup()
function setup() {
  createCanvas(500, 500);
  reset();
}

// Description of draw()
function draw() {
  background(0);

  for (let i = 0; i < balloons.length; i++) {
    // Get the current balloon
    let balloon = balloons[i]; // This allows us not to have to change all balloon to balloons[i];

    handleHighlighting (balloon);

    // Display the balloon
    displayBalloon (balloon);
    }
  }

  function handleHighlighting (balloon) {
    // Check for mouseOver
    if (mouseIsInsideBalloon (balloon)) {
      balloon.fill = balloon.highlightFill;
    }
    else {
      balloon.fill - balloon.normalFill;
    }
  }

  function displayBalloon (balloon) {
    if (!balloon.popped) {
      push();
      noStroke();
      fill(balloon.fill);
      ellipse(balloon.x, balloon.y, balloon.size);
      pop();
    }
  }

  function mouseIsInsideBalloon (balloon) {
    let d = dist(mouseX, mouseY, balloon.x, balloon.y);
    if (d < balloon.size / 2) {
      return true;
    }
    else {
      return false;
    }
  }

  function mousePressed () {
    for (let i = 0; i < balloons.length; i++) {
      let balloon = balloons[i];
      if (mouseIsInsideBalloon(balloon)) {
        balloon.popped = true;
      }
    }
  }

  function keyPressed() {
    reset();
  }

  function reset() {
    balloons = [];

    for (let i = 0; i < numBalloons; i++) {
      // Create the balloon
      let balloon = createBalloon(255, 0, 0);
      // Add the balloon to the array
      balloons.push(balloon);
    }

    for (let i = 0; i < numBalloons; i++) {
      // Create the balloon
      let balloon = createBalloon(0, 0, 255);
      // Add the balloon to the array
      balloons.push(balloon);
    }
  }

  function createBalloon (r, g, b) {
    let balloon = {
      x: random(0, width),
      y: random(0, height),
      size: 75,
      fill: color(r - 100, g, b),
      highlightFill: color(r, g, b),
      normalFill: color(r - 100, g - 100, b - 100,),
      poppped: false
    };
    return balloon
  }
