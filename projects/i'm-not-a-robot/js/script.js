// Project 2 - i'm not a robot
// Owen Avon

// The objective of this program is for the user to prove that they are not a robot, and in fact an human behind the screen. These question will include slecting the correct answer, interacting in various mini games, etc. all wihtin a specified time.

// See "README" for a detailed"game plan".

"use strict";

let tokens = []; // Creates an array named tokens.
let numTokens = 50; // Provides a dynamic number of instances inside the array.
let timer = 5; // Sets the timer's value.

let gameFalseStart = {
  string: `I'm not a Robot`,
  x: 375,
  y: 375,
}

let gameError = {
  string: `Error 403`,
  x: 375,
  y: 375,
}

let gameIntroTextLine1 = { // Creates custom object for main heading.
  string: `You thought it would be that Easy?`,
  x: 375,
  y: 300,
}

let gameIntroTextLine2 = { // Creates custom object for main heading.
  string: `You must prove that you are human before proceeding...`,
  x: 375,
  y: 350,
}

let gameTitle = { // Creates custom object for main heading.
  string: `I'm not a robot`,
  x: 375,
  y: 300,
}

let gameStart = { // Creates custom object for secondary heading.
  string: `Press "Enter" to play`,
  x: 375,
  y: 375,
}

let gameObjective = { // Creates custom object for secondary heading.
  string: `OBJECTIVE: Complete the various tests to prove that you are human.`,
  x: 375,
  y: 600,
}

let gameControl = { // Creates custom object for secondary heading.
  string: `CONTROLS: Vary dpending on test. Follow on screen instruction.`,
  x: 375,
  y: 640,
}

let gameNote = { // Creates custom object for secondary heading.
  string: `NOTE: Allow the web broswer to acess audio & video inputs for the full experience.`,
  x: 375,
  y: 680,
}

let audioPuzzleHeading = { // Creates custom object for secondary heading.
  string: `Use your voice to navigate the car up the road. The louder you talk, the faster the car moves.`,
  x: 375,
  y: 100,
}

let gameSuccess = {
  string: `You're not a robot`,
  x: 375,
  y: 375,
}

let gameFail = {
  string: `For security reasons, you must re-start the simulation`,
  x: 375,
  y: 375,
}

let staticBg = {
  numStatic: 500,
  strokeWeight: 2,
  stroke: {
    r: 255,
    g: 255,
    b: 0
  }
};

let fontSize = { // Creates custom object for various font sizes.
  small: 18,
  medium: 64,
  large: 96
};

let state = `falseStart`;
let startInstructionVisible = false;
let startLandingVisible = false;
let startLandingTimer = 0;

let startButton = {
  x: undefined,
  y: undefined,
  size: 100,
  fill: 255,
  highLightFill: 128,
  normalFill: 255,
  disappear: false
};

let mic;
let audioCar = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  fill: 255,
  size: 100
  // image: undefined
};

// let questionClick = {
//   x: undefined,
//   y: undefined,
//   size: 100,
//   disappear: false
// };

// let question = `What day comes after Monday?`;
//
// let answers = [
//   `Yes`,
//   `No`,
//   `Maybe`,
//   `Tuesday`
// ];
//
// let chosenQuestion = `Click for question to appear.`;

function setup () { // Executes the lines of code contained inside its block.
  createCanvas (750, 750); // Sets the Canvas width and height.
  generateRobotButton();
  generateAudioinput();
  generateAudioCar();
  // generateTokens();
  delayVirus();
}

function generateTokens() { // Function called in setup.
  for (let i = 0; i < numTokens; i++) { // Create our Tokens by counting up to the number of the Tokens.
    let horizontal = random(0, width); // Set a random x position.
    let vertical = random(100, 650); // set a random y postion.
    let tokenSize = random(25, 50); // set a random size.
    let color = { // Provide a colour to the inside of the token.
      r: 255,
      g: 255,
      b: 0
    };
    let token = new Virus(horizontal, vertical, tokenSize, color); // Calls class and sets parameters
    tokens.push(token); // Adds the token to the array of tokens.
  }
}

function delayVirus () {
  setTimeout(showInstruction, 3000);
}

function showInstruction () {
  startInstructionVisible = true;
}

function generateRobotButton() {
  startButton.x = width / 2;
  startButton.y = height / 1.5;
}

function generateAudioinput() {
  mic = new p5.AudioIn();
  mic.start();
}

function generateAudioCar() {
  audioCar.x = width / 2;
  audioCar.y = height / 1;
}

function draw() { // Location where code is excuted.
  if (state === `falseStart`) {
    falseStart();
  }
  if (state === `error`) {
    error();
  }
  else if (state === `instructions`) {
    instructions ();
  }
  else if (state === `landing`) {
    landing ();
  }
  else if (state === `audioPuzzle`) {
    audioPuzzle ();
  }
  // else if (state === `ballPuzzle`) {
  //   ballPuzzle ();
  // }
  // else if (state === `cameraPuzzle`) {
  //   cmaeraPuzzle ();
  // }
  // else if (state === `winner`) {
  //   winner ();
  // }
  // else if (state === `loser`) {
  //   loser ();
  // }
}


// FALSESTART STATE
function falseStart() { // Main landing state code.
  background(0); // Displays the background colour as black.

  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameFalseStart.string, gameFalseStart.x, gameFalseStart.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.

  startButtonOverlap();
  displayStartButton();
  startButtonHighLight();
}

function startButtonHighLight() { // Highlight function for start button.
  let d = dist(mouseX, mouseY, startButton.x, startButton.y);
  if (d < startButton.size / 2) {
    startButton.fill = startButton.highLightFill;
    cursor(HAND);
  }
  else {
    startButton.fill = startButton.normalFill;
    cursor(ARROW);
  }
}

function startButtonOverlap() {
  let d = dist(mouseX, mouseY, startButton.x, startButton.y);
  if (d < startButton.size / 2) {
    return true;
  }
  else {
    return false;
  }
}

function displayStartButton() {
  if (!startButton.disappear) {
  push();
  noStroke();
  fill(startButton.fill);
  rectMode (CENTER);
  rect(startButton.x, startButton.y, startButton.size);
  pop();
  }
}

// ERROR STATE
function error() { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(255, 0, 0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameError.string, gameError.x, gameError.y); // Displays the title of the game.
  cursor(ARROW);
  // updateTokens();
  virus();
  errorWaitTime();
  pop(); // Isolates code from using global properties.
}

function virus() {
  if (startInstructionVisible) {
    for (let i = 0; i < staticBg.numStatic; i++) { // makes a single point increase every frame.
      let x = random(0, width); // Sets a random point postion.
      let y = random(0, height); // Sets a random point postion.
      strokeWeight(staticBg.strokeWeight); // Indicates the point's size / weight.
      stroke(staticBg.stroke.r, staticBg.stroke.g, staticBg.stroke.b); // Sets the points colour to yellow.
      point(x, y); // Indicates that the points will be dsiplayed at random Coordinates.
    }
  }
}

function errorWaitTime() { // Main code for dynamic game clock.
  if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    timer --;
  }
  if (timer == 0 && state === `error` ) { // If the timer hits zero (0), then...
    state = `instructions`; // Run the loser state.
  }
}


// INSTRUCTIONS STATE
function instructions () { // Main landing state code.
  background(0); // Displays the background colour as black.

  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameIntroTextLine1.string, gameIntroTextLine1.x, gameIntroTextLine1.y); // Displays the title of the game.
  text(gameIntroTextLine2.string, gameIntroTextLine2.x, gameIntroTextLine2.y); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.

  instructionsWaitTime();
}


// LANDING STATE
function landing () { // Main landing state code.
  background(0); // Displays the background colour as black.
  displayLandingText();
}

function instructionsWaitTime() { // Main code for dynamic game clock.

  startLandingTimer +=1;
  if (startLandingTimer >= 300) {
    state = `landing`;
  }
}

function displayLandingText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(0, 255, 0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  text(gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
  text(gameObjective.string, gameObjective.x, gameObjective.y); // Displays the text that dictates what the user must press to start the game.
  text(gameControl.string, gameControl.x, gameControl.y); // Displays the text that dictates what the user must press to start the game.
  text(gameNote.string, gameNote.x, gameNote.y); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.
}

function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
    state = `audioPuzzle`; // Runs the "simulation" state.
  }
}

// audioPuzzle STATE
function audioPuzzle () { // Main landing state code.
  background(125); // Displays the background colour as black.
  audioPuzzleText();
  audiovisualization();
}

function audioPuzzleText () {
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(audioPuzzleHeading.string, audioPuzzleHeading.x, audioPuzzleHeading.y);
}

function audiovisualization() {
  let level = mic.getLevel(); // Get microphone volume

  if (level >= 0.2) { // Check if the car will move
    audioCar.vy = 5; // Exit at canvas top
    if (level <= 0.2) {
      audioCar.vy = 0;
    }
  }

  // Move the car
  audioCar.x = audioCar.x - audioCar.vx;
  audioCar.y = audioCar.y - audioCar.vy;

  // Display the ghost
  push();
  noStroke();
  fill(audioCar.fill);
  ellipse(audioCar.x, audioCar.y, audioCar.size);
  pop();
}


// MOUSE PRESS FUNCTION
function mousePressed() {
  if (startButtonOverlap()) {
    startButton.disappear = true;
    state = `error`;
  }
  // if (questionMousePress()) {
  //   chosenQuestion = random(answers);
  // }
}

// function updateTokens() { // Function that is called in simulation
//   let numActiveTokens = 0; // A variable to count how many active tokens we find this frame
//   for (let i = 0; i < tokens.length; i++) {
//     let token = tokens[i]; // Sets token variable to an Infinite  amount in the array.
//     if (token.view) { // Says, if the tokens are visble, do the following...
//       numActiveTokens++; // Since this is active, add one to our count.
//       token.display(); // links to the dispay class in Token.js
//     }
//   }
// }
