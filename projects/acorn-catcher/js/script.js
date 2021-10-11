
// Project 1 - Acorn Catcher
// Owen Avon

// The purpose of this project is to create a program with various states and experiment with knowledge that we have gained thus far.

"use strict";

let brownAcorn = {
  x: undefined,
  y: undefined,
  size: 100,
  minSize: 50,
  maxSize: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: 100
};

let redAcorn = {
  x: undefined,
  y: undefined,
  size: 100,
  minSize: 25,
  maxSize: 75,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: 150
};

let goldAcorn = {
  x: undefined,
  y: undefined,
  size: 100,
  minSize: 5,
  maxSize: 25,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: 200
};

let basket = {
  x: undefined,
  y: undefined,
  size: 100,
  ax: 0,
  ay: 0,
  acceleration: 0,
  speed: 5
};

let bgImages = {
  landing: undefined,
  winner: undefined,
  loser: undefined,
};

let simulationGraphics = {
  x: 0,
  y: 0,
  size: 125,
  brownAcorn: undefined,
  redAcorn: undefined,
  goldAcorn: undefined,
  basket: undefined,
};

let fontSize = {
  small: 32,
  medium: 64,
  large: 96
};

// let gameFont;

let score = 0;

let timer = 30 // Sets the timer's value.
let state = `landing`; // Can be: title, simulation, winner, loser

function setup () { // executes the lines of code contained inside its block.
  createCanvas (750, 750); // Sets the Canvas width and height.
  setupCharacters (); // Calls the setupCharacters() function.
}

function setupCharacters () { // Dictates the two characters.
  brownAcorn.x = random(0, width); // Indicates that the Brown Acorn will appear at a random x postion.
  brownAcorn.vy = goldAcorn.speed; // Sets the Brown Acorn velocity.

  redAcorn.x = random(0, width); // Indicates that the Red Acorn will appear at a random x postion.
  redAcorn.vy = goldAcorn.speed; // Sets the Red Acorn velocity.

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
  // else if (state === `winner`) { // Indicates that when the state equates to "loser", start said state.
  //   winner ();
  // }
  // else if (state === `loser`) { // Indicates that when the state equates to "winner", start said state.
  //   loser ();
  // }
}

function landing () { // Location where code is excuted.
  push(); // Isolates code from using global properties.
  background(0); // Calls the background image.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(200, 100, 100); // Makes the font salmon in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  // textFont(eightBitFont); // Changes the font from the default to a custom font.
  text(`Acorn Catcher`, width / 2, height / 2.75); // Displays on screen text at desired location.
  text(`Press "Enter" to play`, width / 2, height / 2); // Displays on screen text at desired location.

  text(`Press "Enter" to play`, width / 2, height / 2); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function simulation () { // simulation state.
  background(0); // Calls the background image.

  basketControl();
  brownAcornMovement();
  redAcornMovement();
  goldAcornMovement();
  gameTimer(); // Calls indciated custom function.
  scoreBoard(); // Calls indciated custom function.
  display(); // Calls indciated custom function.
}

function winner () { // winner state.
  push(); // Isolates code from using global properties.
  background(0); // Calls the background image.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  // textFont(eightBitFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`You've survived the enemy!`, keyCode, width / 2, height / 1.2); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function loser () { // loser state.
  push(); // Isolates code from using global properties.
  background (0); // Sets the background to black in colour.
  textSize(fontSize.large); // Displays the font size as 100px.
  fill(255, 0, 0); // Makes the font red in colour.
  // textFont(eightBitFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`GAME OVER`, width / 2.6, height / 1.15); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function basketControl () {

  basket.x = mouseX;
  basket.y = mouseY;

}

function brownAcornMovement () {

}

function redAcornMovement () {

}

function goldAcornMovement () {

}

function gameTimer () { // Creates a dynamic game clock.
  push(); // Isolates code from using global properties.
  fill(255); // Makes the font white in colour.
  // textFont(eightBitFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, TOP); // Dictates the text alignment style.
  textSize(fontSize.medium); // Displays the font size as 64px.
  text(timer, width / 5, height / 5.5); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.

  if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    timer --;
  }
  if (timer == 0) { // Stops when the timer hits zero, and...
    state = `winner`; // Runs the winner state.
  }
}

function scoreBoard () {
  push();
  fill(255);
  textSize(25);
  text(`score:`, 100, 100);
  text(score, 100, 35);
  pop();
}

function brownAcornScore () {  // Checks to see if brown acorn is in the basket.
  let d = dist(basket.x, basket.y, brownAcorn.x, brownAcorn.y ); // Assigns a variable to basket and brown acorn in regards to distance.
  if (d < basket.size / 2 + brownAcorn.size / 2) { // Indicates the location of where the two characters will touch.
    score = score + 5;
  }
}

function redAcornScore () {  // Checks to see if red acorn is in the basket.
  let d = dist(basket.x, basket.y, redAcorn.x, redAcorn.y); // Assigns a variable to basket and red acorn in regards to distance.
  if (d < basket.size / 2 + brownAcorn.size / 2) { // Indicates the location of where the two characters will touch.
    score = score + 10;
  }
}

function goldAcornScore () {  // Checks to see if gold acorn is in the basket.
  let d = dist(basket.x, basket.y, goldAcorn.x, goldAcorn.y); // Assigns a variable to basket and gold acorn in regards to distance.
  if (d < basket.size / 2 + goldAcorn.size / 2) { // Indicates the location of where the two characters will touch.
    score = score + 15;
  }
}

function display () { // Displays the on screen characters.
  fill(brownAcorn.fill);
  ellipse(brownAcorn.x, brownAcorn.y, brownAcorn.size); // Displays the Brown Acorn character.

  fill(redAcorn.fill);
  ellipse(redAcorn.x, redAcorn.y, redAcorn.size); // Displays the Red Acorn character.

  fill(goldAcorn.fill);
  ellipse(goldAcorn.x, goldAcorn.y, goldAcorn.size); // Displays the Gold Acorn character.
}

function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // Says when the "P" key is pushed, and the state is in "title", switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
}
