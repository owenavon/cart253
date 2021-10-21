
// Exercise 04: The Age of Aquariums
// Owen Avon

// The purpose of this exercise is to create a program with loops and arrays.

// Plan:
// Create 4 states: landing, simulation, winner looser, so that the program progresses along.
// Create an ellipse that is controlled by mouseX and mouseY.
// Create a scoreboard and timer to add an objective to the game, as well as to trigger various sates
// Create an array for the cage. The cage will allow the fish to enter for safety, but prevent the shark, user from entering.

"use strict";

let school = [];
let schoolSize = 25;

let safety = [];
let safetyZone = 3;

let shark = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
  fill: {
    r: 0,
    g: 0,
    b: 255
  },
}

let gameTitle = {
  string: `Hungry Shark`,
  x: 375,
  y: 300,
}

let gameStart = {
  string: `"Click" to play`,
  x: 375,
  y: 375,
}

let fontSize = {
  small: 28,
  medium: 56,
  large: 84
};

let bgImage = {
  water: undefined,
  cage: undefined
};

let score = 0; // Starts the score board at "0".
let timer = 25; // Sets the timer's value.
let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".

function preload () {
bgImage.water = loadImage("assets/images/water.jpg"); // Preloads the "Water" image.
bgImage.cage = loadImage("assets/images/cage.png"); // Preloads the "Water" image.
}

function setup() {
  createCanvas(750, 750);
  setupFish ();
  setupSafety ();
}

function setupFish () {
  for (let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0, width), random(0, height));
    school.push(fish);
  }
}

function createFish (x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
    fill:{
      r: 200,
      g: 100,
      b: 100
    },
    eaten: false

  }
  return fish;
}

function setupSafety () {
  for (let i = 0; i < safetyZone; i++) {
    let cage = createSafety(random(100, width), random(100, height)); // Prevents the safety zone from blocking the shark upon simulation startup.
    safety.push(cage);
  }
}

function createSafety (x, y) {
  let cage = {
    x: x,
    y: y,
    size: 200,
  }
  return cage;
}

function draw() {
  if (state === `landing`) { // Indicates that when the state equates to "landing", start said state.
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

function landing() { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  text(gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
  landingInstructions();
  pop(); // Isolates code from using global properties.
}

function landingInstructions() { // Text instructions for landing state.
  push (); // Isolates code from using global properties.
  textSize (fontSize.small); // Displays the font size as 32px.
  fill (255, 0, 0); // Displays the instructions in red.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  text (`OBJECTIVE: Eat 20 fish within 25 seconds.`, width / 2, 600); // Displays on screen text slighly lower then the procceding text.
  text (`CONTROLS: Use your mouse to navigate the shark.`, width / 2, 640); // Displays on screen near the bottom of the canvas.
  text (`NOTE: Pay close attention to the yellow "safety" zones.`, width / 2, 680); // Displays on screen text slighly lower then the procceding text.
  pop (); // Isolates code from using global properties.
}

function simulation () { // simulation state.
  background(bgImage.water); // Calls the background image.
  generateSafety();
  generateShark(); // Calls indciated custom function.
  generateFish();
  gameTimer();
  scoreBoard();
}

function winner() { // Main winner state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.large); // Displays the font size as 32px.
  fill(255); // Makes the font yellow in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  winnerSubtext();
  text (`Congratulations`, width / 2, height / 2); // // Displays on screen text the top left corner. It is then translated via the parameter above.
  pop (); // Isolates code from using global properties.
}

function winnerSubtext() {
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255, 255, 0); // Makes the font yellow in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text (`The shark is delighted with it's dinner!`, width / 2, height / 1.5); // // Displays on screen text the top left corner. It is then translated via the parameter above.
  pop (); // Isolates code from using global properties.
}

function loser () { // Main loser state code.
  push (); // Isolates code from using global properties.
  background (0); // Displays the background colour as black.
  textSize (fontSize.large); // Displays the font size as 100px.
  fill (255); // Makes the font red in colour.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  loserSubtext();
  text (`GAME OVER`, width / 2, height / 2); // Displays on screen text at the center of the canvas
  pop (); // Isolates code from using global properties.
}

function loserSubtext() {
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255, 0, 0); // Makes the font yellow in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text (`The poor shark is still hungry!`, width / 2, height / 1.5); // // Displays on screen text the top left corner. It is then translated via the parameter above.
  pop (); // Isolates code from using global properties.
}

function generateShark () {
  controlShark ();
  displayShark ();
}

function controlShark () {
  let dx = shark.x - mouseX; // Defines x distance variable.
  let dy = shark.y - mouseY; // Defines y distance variable.

  if (dx < 0) { // provides direction for left mouse movement.
    shark.vx = shark.speed;
  }
  else if (dx > 0) { // provides direction for right mouse movement.
    shark.vx = -shark.speed;
  }
  if (dy < 0) { // provides direction for upward mouse movement.
    shark.vy = shark.speed;
  }
  else if (dy > 0) { // provides direction for downward mouse movement.
    shark.vy = -shark.speed;
  }

  shark.x = shark.x + shark.vx;
  shark.y = shark.y + shark.vy;

  shark.x = constrain(shark.x, 0, width);
  shark.y = constrain(shark.y, 0, height);
}

function displayShark () {
  push();
  fill(shark.fill.r, shark.fill.g, shark.fill.b);
  noStroke();
  ellipse(shark.x, shark.y, shark.size);
  pop();
}

function checkShark (cage) {
  let d = dist(shark.x, shark.y, cage.x, cage.y);
  if (d < shark.size / 2 + cage.size / 2) {
    shark.x = shark + -1;
    }
  }

function generateFish () {
  for (let i = 0; i < school.length; i++ ) {
    moveFish(school[i]);
    displayFish(school[i]);
    checkFish(school[i]);
  }
}

function moveFish(fish) {
  let change = random(0, 1);
  if (change < 0.1) { // 10% chance that the fish change direction.
    fish.vx = random (-fish.speed, fish.speed);
    fish.vy = random (-fish.speed, fish.speed);
  }

  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

function displayFish (fish) {
  if (!fish.eaten) {
    push();
    fill(fish.fill.r, fish.fill.g, fish.fill.b);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
  }
}

function checkFish (fish) {
  if (!fish.eaten) {
    let d = dist(shark.x, shark.y, fish.x, fish.y);
    if (d < shark.size / 2 + fish.size / 2) {
      fish.eaten = true;
      score = score + 1;
      }
    }
  }

  function generateSafety (cage) {
    for (let i = 0; i < safety.length; i++ ) {
      displaySafety(safety[i]);
      checkSafety(safety[i]);
    }
  }

  function displaySafety (cage) {
    push();
    fill(255, 255, 0);
    noStroke();
    ellipse(cage.x, cage.y, cage.size);
    // image(bgImage.cage, cage.x, cage.y, cage.size)
    pop();
  }

  function checkSafety (cage) {
    let d = dist(shark.x, shark.y, cage.x, cage.y);
    if (d < shark.size / 2 + cage.size / 2) {
      shark.x = shark.x + -shark.vx;
      shark.y = shark.y + -shark.vy;
    }
  }

  function gameTimer () { // Main code for dynamic game clock.
    push (); // Isolates code from using global properties.
    textSize (fontSize.medium); // Displays the font size as 64px.
    fill (255); // Makes the font white in colour.
    textAlign (CENTER, CENTER); // Dictates the text alignment style.
    text (`Time:`, 565, 50); // Displays text at the top right of the canvas.
    text (timer, 690, 50); // Displays dynamic timer result at the top right of the canvas.
    pop (); // Isolates code from using global properties.

    if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
      timer --;
    }
    if (timer == 0) { // If the timer hits zero (0), then...
      state = `loser`; // Run the loser state.
    }
  }

  function scoreBoard () { // Main code for dynamic score board.
    push (); // Isolates code from using global properties.
    fill (255); // Makes the font black in colour.
    textSize (fontSize.medium); // Displays the font size as 64px.
    // textFont (retroFont); // Changes the font from the default to a custom font.
    text (`Score:`, 50, 75); // Displays text at the top left of the canvas.
    text (score, 250, 75); // Displays dynamic score result at the top left of the canvas.
    pop (); // Isolates code from using global properties.
    if (score >= 20) { // If the score is equal to or greater then 500...
      state = `winner`; // Runs the winner state.
    }
  }

  function mousePressed () { // p5 function to perform action with keyboard input.
    if (state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
      state = `simulation`; // Runs the "simulation" state.
    }
  }
