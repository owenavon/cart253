// Project 2 - i'm not a robot
// Owen Avon

// The objective of this program is for the user to prove that they are not a robot, and in fact an human behind the screen. These question will include slecting the correct answer, interacting in various mini games, etc. all wihtin a specified time.

// See "README" for a detailed"game plan".

"use strict";

let audioCar;
let potholes = [];

let addPotholeInterval = 1 * 75; // How often to add a new vehicle (in frames). One every second The timer that will count down to 0 so we'll know when to add a new vehicle
let audioPuzzletimer = addPotholeInterval;

let state = `falseStart`;
let startInstructionVisible = false;
let startLandingVisible = false;
let startLandingTimer = 0;

let mic;
let autoTimer = 5; // Sets the timer's value.

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
  string: `OBJECTIVE: Complete the various puzzles to prove that you are human.`,
  x: 375,
  y: 600,
}

let gameControl = { // Creates custom object for secondary heading.
  string: `CONTROLS: Vary dpending on puzzles. Follow on screen instruction.`,
  x: 375,
  y: 640,
}

let gameNote = { // Creates custom object for secondary heading.
  string: `NOTE: Allow the web broswer to acess audio & video inputs for the full experience.`,
  x: 375,
  y: 680,
}

let audioPuzzleHeading = { // Creates custom object for secondary heading.
  string: `Navigate the car up the road with your voice.`,
  x: 375,
  y: 100,
}

let audioPuzzleSubHeading = { // Creates custom object for secondary heading.
  string: `The louder you talk, the faster the car moves. Avoid potholes at all costs.`,
  x: 375,
  y: 125,
}

let ballPuzzleHeading = { // Creates custom object for secondary heading.
  string: `Very good... Now you must successfully collect all the tokens.`,
  x: 375,
  y: 100,
}

let ballPuzzleSubHeading = { // Creates custom object for secondary heading.
  string: `Aw, Shucks... You've reached the end of the prototype.`,
  x: 375,
  y: 200,
}

let cameraPuzzleHeading = { // Creates custom object for secondary heading.
  string: `Hmm, you're starting to appear as human... One more test.`,
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

let startButton = {
  x: undefined,
  y: undefined,
  size: 100,
  fill: 255,
  highLightFill: 128,
  normalFill: 255,
  disappear: false
};

function setup () { // Executes the lines of code contained inside its block.
  createCanvas (750, 750); // Sets the Canvas width and height.
  generateRobotButton();
  generateAudioinput();
  delayVirus();
  generateAudioCar();
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
  let x = width / 2;
  let y = height;
  audioCar = new AudioCar(x, y);
}

function draw() { // Location where code is excuted.
  if (state === `falseStart`) {
    falseStart();
  }
  if (state === `error`) {
    error();
  }
  else if (state === `instructions`) {
    instructions();
  }
  else if (state === `landing`) {
    landing();
  }
  else if (state === `audioPuzzle`) {
    audioPuzzle();
  }
  else if (state === `ballPuzzle`) {
    ballPuzzle();
  }
  // else if (state === `cameraPuzzle`) {
  //   cmaeraPuzzle ();
  // }
  // else if (state === `winner`) {
  //   winner ();
  // }
  else if (state === `loser`) {
    loser ();
  }
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
  if (frameCount % 60 == 0 && autoTimer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    autoTimer --;
  }
  if (autoTimer == 0 && state === `error` ) { // If the timer hits zero (0), then...
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
  audioCarResources();
  audioPotholeTimer();
  audioPotholeStates();
}

function audioPuzzleText () {
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(audioPuzzleHeading.string, audioPuzzleHeading.x, audioPuzzleHeading.y);
  text(audioPuzzleSubHeading.string, audioPuzzleSubHeading.x, audioPuzzleSubHeading.y);
}

function audioCarResources() {
  audioCar.handleInput();
  audioCar.move();
  audioCar.display();
}

function audioPotholeTimer() {
  audioPuzzletimer -= 0.5; // Update our timer by counting down half a frame

  if (audioPuzzletimer <= 0) { // Check if our timer hit zero
    let y = random(0, 600);// Choose a random y position
    let r = random(0, 1);// Generate a random number for probability
    let pothole = undefined; // We're going to randomly create a vehicle in this variable

    if (r < 0.5) { // Use comparisons with r to randomly create one of two types of potholes
      pothole = new CanadianPothole(0, y);// Always create them at an x of 0 so they start on one side of the screen
    }
    else {
      pothole = new AmericanPothole(0, y);
    }

    r = random(0, 1); // Generate another random number to control which direction the new potholes will move in
    if (r < 0.1) { // Half the time left and half the time right. We also multiply the speed by a random number so that there's some variance between different
      pothole.vx = -pothole.speed * random(0.5, 0.7);
    } else {
      pothole.vx = pothole.speed * random(0.5, 0.7);
    }

    potholes.push(pothole); // Add our new potholes to the simulation by adding it to the array
    audioPuzzletimer = addPotholeInterval; // Reset timer
  }
}

function audioPotholeStates() {
  // Go through all the vehicles currently in the simulation
  for (let i = 0; i < potholes.length; i++) {
    let pothole = potholes[i];
    // Call its basic methods
    pothole.move();
    pothole.wrap();
    pothole.display();

    audioCar.checkHit(pothole); // Check whether the audioCar hit the pothole
  }

  if (!audioCar.alive) { // If the audioCar hits a pothole, go to loser state
    state = `loser`;
  }

  if (audioCar.y < 0) { // If the audioCar makes it past the top of the canvas then switch to the ballPuzzle state.
    state = `ballPuzzle`;
  }
}


// ballPuzzle STATE
function ballPuzzle () { // Main landing state code.
  background(50); // Displays the background colour as black.

  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(ballPuzzleHeading.string, ballPuzzleHeading.x, ballPuzzleHeading.y); // Displays the title of the game.
  text(ballPuzzleSubHeading.string, ballPuzzleSubHeading.x, ballPuzzleSubHeading.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


// LOSER STATE
function loser() { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255, 0, 0); // Makes the red white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameFail.string, gameFail.x, gameFail.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}

// MOUSE PRESS FUNCTION
function mousePressed() {
  if (startButtonOverlap()) {
    startButton.disappear = true;
    state = `error`;
  }
}
