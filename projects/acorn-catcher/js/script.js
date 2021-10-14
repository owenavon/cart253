
// Project 1 - Acorn Catcher
// Owen Avon

// The purpose of this project is to create a program with various states and experiment with knowledge that we have gained thus far.

"use strict";

let brownAcorn = {
  x: 250,
  y: 0,
  size: 50,
  minSize: 50,
  maxSize: 75,
  vx: 0,
  vy: 0,
  minSpeed: 5,
  maxSpeed: 10,
  speed: 5,
  fill: {
    r: 153,
    g: 101,
    b: 21
  }
};

let redAcorn = {
  x: 300,
  y: 50,
  size: 25,
  minSize: 25,
  maxSize: 50,
  vx: 0,
  vy: 0,
  minSpeed: 5,
  maxSpeed: 10,
  speed: 5,
  fill: {
    r: 255,
    g: 0,
    b: 0
  }
};

let goldAcorn = {
  x: 350,
  y: 100,
  size: 5,
  minSize: 5,
  maxSize: 25,
  vx: 0,
  vy: 0,
  minSpeed: 5,
  maxSpeed: 10,
  speed: 5,
  fill: {
    r: 215,
    g: 175,
    b: 55
  }
};

let basket = {
  x: 375,
  y: 720,
  size: 75,
  ax: 0,
  ay: 0,
  vx: 0,
  vy: 0,
  friction: 0.99,
  maxSpeed: 20,
  fill: 200
};

// let bgImages = {
//   landing: undefined,
//   winner: undefined,
//   loser: undefined,
// };

// let simulationGraphics = {
//   x: 0,
//   y: 0,
//   size: 125,
//   brownAcornImg: undefined,
//   redAcornImg: undefined,
//   goldAcornImg: undefined,
//   basketImg: undefined,
// };

let fontSize = {
  small: 32,
  medium: 64,
  large: 96
};

let gameTitle = {
  string: `Acorn Catcher`,
  x: 375,
  y: 0,
  vx: 0,
  vy: 2,
}

let gameStart = {
  string: `Press "Enter" to play`,
  x: 0,
  y: 375,
  vx: 2.5,
  vy: 0,
}

let score = 0;
let timer = 25; // Sets the timer's value.
let state = `landing`; // Can be: title, simulation, winner, loser
let acornSFX;
let retroFont;

function preload () {
  acornSFX = loadSound(`./assets/sounds/click.mp3`);
  retroFont = loadFont("assets/fonts/Nintendo-DS-BIOS.ttf") // Preloads the custom downloaded font.
}

function setup () { // executes the lines of code contained inside its block.
  createCanvas (750, 750); // Sets the Canvas width and height.
  setupCharacters (); // Calls the setupCharacters() function.
}

function setupCharacters () { // Dictates the two characters.
  brownAcorn.x = random(0, width); // Indicates that the Brown Acorn will appear at a random x postion.
  brownAcorn.vy = brownAcorn.speed; // Sets the Brown Acorn velocity.

  redAcorn.x = random(0, width); // Indicates that the Red Acorn will appear at a random x postion.
  redAcorn.vy = redAcorn.speed; // Sets the Red Acorn velocity.

  goldAcorn.x = random(0, width); // Indicates that the Gold Acorn will appear at a random x postion.
  goldAcorn.vy = goldAcorn.speed; // Sets the Gold Acorn velocity.
}

function draw() { // Location where code is excuted.
  if (state === `landing`) { // Indicates that when the state equates to "title", start said state.
    landing();
  }
  else if (state === `simulation` ) { // Indicates that when the state equates to "simulation", start said state.
    simulation ();
  }
  else if (state === `winner`) { // Indicates that when the state equates to "winner", start said state.
    winner ();
  }
  else if (state === `loser`) { // Indicates that when the state equates to "loser", start said state.
    loser ();
  }
}

function landing () { // Location where code is excuted.
  push(); // Isolates code from using global properties.
  background(0); // Calls the background image.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  textFont(retroFont); // Changes the font from the default to a custom font.
  text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  text(gameStart.string, gameStart.x, gameStart.y); // Displays what the user must press to start the game.
  landingInstructions ();
  pop(); // Isolates code from using global properties.

  gameTitle.y = gameTitle.y + gameTitle.vy
  gameTitle.y = constrain(gameTitle.y, 0, 300); // Constrains the basket's y postion within the canvas.

  gameStart.x = gameStart.x + gameStart.vx
  gameStart.x = constrain(gameStart.x, 0, 375); // Constrains the basket's y postion within the canvas.
}

function landingInstructions() {
  push();
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255, 0, 0);
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  textFont(retroFont); // Changes the font from the default to a custom font.
  text(`CONTROLS: Use the left and right arrow keys to move the basket.`, width / 2, 600);
  text(`OBJECTIVE: Collect 500 acorn points within 25 seconds.`, width / 2, 640); // Displays on screen text at desired location.
  text(`NOTE: Pay close atention to the size and colour of the accorns.`, width / 2, 680); // Displays on screen text at desired location.
  pop();
}

function simulation () { // simulation state.
  background(125); // Calls the background image.

  basketControl();
  brownAcornMovement();
  brownAcornScore();
  redAcornMovement();
  redAcornScore();
  goldAcornMovement();
  goldAcornScore();
  gameTimer(); // Calls indciated custom function.
  scoreBoard(); // Calls indciated custom function.
  display(); // Calls indciated custom function.
}

function winner () { // winner state.
  push(); // Isolates code from using global properties.
  background(0); // Calls the background image.
  textSize(fontSize.large); // Displays the font size as 32px.
  fill(255, 255, 0); // Makes the font white in colour.
  textFont(retroFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  winnerText();
  translate(width / 2, height / 2);
  rotate(radians(frameCount));
  text(`Congratulations!`, 0,0);
  pop(); // Isolates code from using global properties.
}

function winnerText() {
  push();
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255);
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  textFont(retroFont); // Changes the font from the default to a custom font.
  text(`You collected all of the acorns. What will you do with them?`, width / 2, 650); // Displays on screen text at desired location.
  pop();
}

function loser () { // loser state.
  push(); // Isolates code from using global properties.
  background (0); // Sets the background to black in colour.
  textSize(fontSize.large); // Displays the font size as 100px.
  fill(255, 0, 0); // Makes the font red in colour.
  textFont(retroFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`GAME OVER`, width / 2, height / 2); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function basketControl () {
  basket.vx = basket.vx + basket.ax;
  basket.vy = basket.vy + basket.vy;

  basket.vx = basket.vx * basket.friction;
  basket.vy = basket.vy * basket.friction;

  basket.vx = constrain(basket.vx, -basket.maxSpeed, basket.maxSpeed);
  basket.vy = constrain(basket.vy, -basket.maxSpeed, basket.maxSpeed);

  basket.x = basket.x + basket.vx;
  basket.y = basket.y + basket.vy;

  basket.x = constrain(basket.x, 0, 750); // Constrains the basket's x postion within the canvas.
  basket.y = constrain(basket.y, 0, 750); // Constrains the basket's y postion within the canvas.

  if (keyIsDown(RIGHT_ARROW)) {
    basket.ax = 0.1;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    basket.ax = -0.1;
  }
  else {
    basket.ax = 0;
  }
}

function brownAcornMovement () {
  brownAcorn.x = brownAcorn.x + brownAcorn.vx;
  brownAcorn.y = brownAcorn.y + brownAcorn.vy; // Allows the brown acorn to fall vertically.

  if (brownAcorn.y > height) {
    brownAcorn.y = 0; // Starts the Brown Acorn from the top of the screen.
    brownAcorn.x = random(0, width);// Randomly selects the BrownAcorn's horizontal starting postion.
    brownAcorn.vy = random(brownAcorn.minSpeed, brownAcorn.maxSpeed); // Allows the Brown Acorn to travel at various velocities.
    brownAcorn.size = random(brownAcorn.minSize, brownAcorn.maxSize); // Allows the Brown Acorn to appear at various sizes.
  }
}

function redAcornMovement () {
  redAcorn.x = redAcorn.x + redAcorn.vx;
  redAcorn.y = redAcorn.y + redAcorn.vy; // Allows the brown acorn to fall vertically.

  if (redAcorn.y > height) {
    redAcorn.y = 0; // Starts the Brown Acorn from the top of the screen.
    redAcorn.x = random(0, width);// Randomly selects the BrownAcorn's horizontal starting postion.
    redAcorn.vy = random(redAcorn.minSpeed, redAcorn.maxSpeed); // Allows the Brown Acorn to travel at various velocities.
    redAcorn.size = random(redAcorn.minSize, redAcorn.maxSize); // Allows the Brown Acorn to appear at various sizes.
  }
}

function goldAcornMovement () {
  goldAcorn.x = goldAcorn.x + goldAcorn.vx;
  goldAcorn.y = goldAcorn.y + goldAcorn.vy; // Allows the brown acorn to fall vertically.

  if (goldAcorn.y > height) {
    goldAcorn.y = 0; // Starts the Brown Acorn from the top of the screen.
    goldAcorn.x = random(0, width);// Randomly selects the BrownAcorn's horizontal starting postion.
    goldAcorn.vy = random(goldAcorn.minSpeed, goldAcorn.maxSpeed); // Allows the Brown Acorn to travel at various velocities.
    goldAcorn.size = random(goldAcorn.minSize, goldAcorn.maxSize); // Allows the Brown Acorn to appear at various sizes.
  }
}

function gameTimer () { // Creates a dynamic game clock.
  push(); // Isolates code from using global properties.
  fill(255); // Makes the font white in colour.
  textFont(retroFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  textSize(fontSize.medium); // Displays the font size as 64px.
  text(`Time:`, 600, 50);
  text(timer, 690, 50); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.

  if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    timer --;
  }
  if (timer == 0) { // Stops when the timer hits zero, and...
    state = `loser`; // Runs the loser state.
  }
}

function scoreBoard () {
  push();
  fill(255);
  textSize(fontSize.medium);
  textFont(retroFont); // Changes the font from the default to a custom font.
  text(`Score:`, 50, 75);
  text(score, 190, 75);
  pop();

  if (score >= 500) { // Stops when the timer hits zero, and...
    state = `winner`; // Runs the loser state.
  }
}

function brownAcornScore () {  // Checks to see if brown acorn is in the basket.
  let d = dist(basket.x, basket.y, brownAcorn.x, brownAcorn.y ); // Assigns a variable to basket and brown acorn in regards to distance.
  if (d < brownAcorn.size / 2 + basket.size / 2) { // Indicates the location of where the two characters will touch.
    score = score + 1;
    if (!acornSFX.isPlaying()) {
      acornSFX.play();
    }
  }
}

function redAcornScore () {  // Checks to see if brown acorn is in the basket.
  let d = dist(basket.x, basket.y, redAcorn.x, redAcorn.y ); // Assigns a variable to basket and brown acorn in regards to distance.
  if (d < redAcorn.size / 2 + basket.size / 2) { // Indicates the location of where the two characters will touch.
    score = score + 5;
    if (!acornSFX.isPlaying()) {
      acornSFX.play();
    }
  }
}

function goldAcornScore () {  // Checks to see if brown acorn is in the basket.
  let d = dist(basket.x, basket.y, goldAcorn.x, goldAcorn.y ); // Assigns a variable to basket and brown acorn in regards to distance.
  if (d < goldAcorn.size / 2 + basket.size / 2) { // Indicates the location of where the two characters will touch.
    score = score + 10;
    if (!acornSFX.isPlaying()) {
      acornSFX.play();
    }
  }
}

function display () { // Displays the on screen characters.

  fill(brownAcorn.fill.r, brownAcorn.fill.g, brownAcorn.fill.b);
  ellipse(brownAcorn.x, brownAcorn.y, brownAcorn.size);

  fill(redAcorn.fill.r, redAcorn.fill.g, redAcorn.fill.b);
  ellipse(redAcorn.x, redAcorn.y, redAcorn.size);

  fill(goldAcorn.fill.r, goldAcorn.fill.g, goldAcorn.fill.b);
  ellipse(goldAcorn.x, goldAcorn.y, goldAcorn.size);

  fill(basket.fill);
  ellipse(basket.x, basket.y, basket.size); // Displays the Gold Acorn character.
}

function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // Says when the "P" key is pushed, and the state is in "title", switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
}
