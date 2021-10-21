
// Exercise 04: The Age of Aquariums
// Owen Avon

// The purpose of this exercise is to create a program with...

//Plan
// - Make one of the circles controlled by the mouse in a reversed direction.
// - Apply the noise() function to the other circle to create a staggered movement effect.
// - Add a timer and connect a state to it, so that when the timer is up, the player wins the game.
// *- Add an "Easter Egg" state named "escape" which can be accessed when in the "simulation" state by pressing the "ESC" key.*
// - Change the circles to 8-bit characters, add 8-bit backgrounds and change the font to an appropriate theme style.

"use strict";

let school = [];
let schoolSize = 25;

let safety = [];
let safetyZone = 5;

// Shark
let shark = {
  x: 100,
  y: 100,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1,
}

let gameTitle = {
  string: `Hungry Shark`,
  x: 375,
  y: 300,
}

let gameStart = {
  string: `"Click" to play`,
  x: 375,
  y: 400,
}

let fontSize = {
  small: 32,
  medium: 64,
  large: 96
};

let score = 0; // Starts the score board at "0".
let timer = 25; // Sets the timer's value.
let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".

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
    eaten: false
  }
  return fish;
}

function setupSafety () {
  for (let i = 0; i < safetyZone; i++) {
    let safetyBubble = createSafety(random(0, width), random(0, height));
    safety.push(safetyBubble);
  }
}

function createSafety (x, y) {
  let safetyBubble = {
    x: x,
    y: y,
    size: 100,
  }
  return safetyBubble;
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

function landing () { // Main landing state code.
  push (); // Isolates code from using global properties.
  background (0); // Displays the background colour as black.
  textSize (fontSize.medium); // Displays the font size as 32px.
  fill (255); // Makes the font white in colour.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  // textFont (retroFont); // Changes the font from the default to a custom font.
  text (gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  text (gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
  pop (); // Isolates code from using global properties.
}

function simulation () { // simulation state.
  background(0); // Calls the background image.

  generateShark(); // Calls indciated custom function.
  generateFish();
  generateSafety();

  gameTimer ();
  scoreBoard ();
}

function winner () { // Main winner state code.
  push(); // Isolates code from using global properties.
  background (0); // Displays the background colour as black.
  textSize (fontSize.large); // Displays the font size as 32px.
  fill (255); // Makes the font yellow in colour.
  // textFont (retroFont); // Changes the font from the default to a custom font.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  // winnerText (); // Calls the winnerText function to display the text.
  text (`Congratulations!`, width / 2, height / 2); // // Displays on screen text the top left corner. It is then translated via the parameter above.
  pop (); // Isolates code from using global properties.
}

function loser () { // Main loser state code.
  push (); // Isolates code from using global properties.
  background (0); // Displays the background colour as black.
  textSize (fontSize.large); // Displays the font size as 100px.
  fill (255); // Makes the font red in colour.
  // textFont (retroFont); // Changes the font from the default to a custom font.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  text (`GAME OVER`, width / 2, height / 2); // Displays on screen text at the center of the canvas
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
  fill(0, 0, 255);
  noStroke();
  ellipse(shark.x, shark.y, shark.size);
  pop();
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
  if (change < 0.05) { // 5% chance that the fish change direction.
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
    fill(200, 100, 100);
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

  function generateSafety () {
    for (let i = 0; i < safety.length; i++ ) {
      displaySafety(safety[i]);
    }
  }

  function displaySafety (safetyBubble) {
    push();
    fill(255, 255, 0);
    noStroke();
    ellipse(safetyBubble.x, safetyBubble.y, safetyBubble.size);
    pop();
  }

  function gameTimer () { // Main code for dynamic game clock.
    push (); // Isolates code from using global properties.
    textSize (fontSize.medium); // Displays the font size as 64px.
    fill (255); // Makes the font white in colour.
    // textFont (retroFont); // Changes the font from the default to a custom font.
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
    if (score >= 10) { // If the score is equal to or greater then 500...
      state = `winner`; // Runs the winner state.
    }
  }

  function mousePressed () { // p5 function to perform action with keyboard input.
    if (state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
      state = `simulation`; // Runs the "simulation" state.
    }
  }
