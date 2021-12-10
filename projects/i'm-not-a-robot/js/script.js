/***********************
I'm not a Robot
Owen Avon

The objective of this program is for the user to prove that they are not a robot, through the process of completing interative simulations.

See "README" for a detailed "game plan".
***********************/

"use strict";

let state = `falseStart`; // Starting state of program

let letters = ""; // Defines variable
let riddleText; // Defines variable

let video; // Defines variable
let modelName = `CocoSsd`; // The name of our model

let cocossd = {  // ObjectDetector object (using the name of the model for clarify)
  disappear: false // User's webcam
};

let predictions = []; // The current set of predictions made by CocoSsd once it's running

let gravityForce = 0.0025; // Assigns a numerical value to the variable gravityForce.
let paddle; // defines paddle as a variable.

let balls = []; // Creates an array named balls.
let numBalls = 10; // Provides a dynamic number of instances inside the array.

let spawnBalls = []; // Creates an array named spawnBalls.
let numEmergencyBalls = 1; // Provides a dynamic number of instances inside the array.

let tokens = []; // Creates an array named tokens.
let numTokens = 5; // Provides a dynamic number of instances inside the array.

let clickSFX = undefined; // Sets clickSFX as a variable.
let congratsSFX = undefined; // Sets congratsSFX as a variable.
let cameraFlashSFX = undefined; // Sets cameraFlashSFX as a variable.
let ballPuzzleJingleSFX = undefined; // Sets cameraFlashSFX as a variable.
let staticSFX = undefined; // Sets staticSFX as a variable.
let successSFX = undefined; // Sets staticSFX as a variable.

let simFont; // Defines custom font.

let audioBall; // Defines variable
let obstacles = []; // Creates an obstacles array

let addobstacleInterval = 1 * 75; // How often to add a new vehicle (in frames). One every second The timer that will count down to 0 so we'll know when to add a new vehicle
let audioPuzzletimer = addobstacleInterval;

let startInstructionVisible = false; // Starts vriable as invisible.
let startLandingVisible = false; // Starts vriable as invisible.
let startLandingTimer = 0; // Sets timer to start at 0.

let mic; // Defines variable
let autoTimer = 5; // Sets the timer's value.

let textFade; // Defines variable
let textFadeAmount = 1; // Text fade by 1 fps.

let synth; // The synthesizer
let notes = [ // The notes
  `F1`,
  `G1`,
  `Ab2`,
  `Bb2`,
  `C2`,
  `Dd2`,
  `Eb2`,
  `F2`,
  `G2`,
  `Ab3`,
  `Bb3`,
  `C3`,
  `Dd3`,
  `Eb3`,
  `F3`,
  `G3`,
  `Ab4`,
  `Bb4`,
  `C4`,
  `Dd4`,
  `Eb4`,
  `F4`,
  `G4`,
  `Ab5`,
  `Bb5`,
  `C5`,
  `Dd5`,
  `Eb5`,
  `F5`,
  `G5`,
  `Ab6`,
  `Bb6`,
  `C6`,
  `Dd6`,
  `Eb6`,
  `F6`,
  `G6`,
  `Ab7`,
  `Bb7`,
  `C7`,
  `Dd7`,
  `Eb7`,
]; // The scale for F minor ("b" means "flat" if you haven't seen it before)
let currentNote = 0; // The current note to play, start at the beginning
let interval; // To track the interval that plays note

let gameFalseStart = {
  string: `I'm not a Robot`,
  x: 375,
  y: 300,
};

let gameError = {
  string: `Error 403`,
  x: 375,
  y: 375,
};

let gameIntroTextLine1 = {
  // Creates custom object for main heading.
  string: `You thought it would be that Easy?`,
  x: 375,
  y: 300,
};

let gameIntroTextLine2 = {
  // Creates custom object for secondary heading.
  string: `You must prove that you are human before proceeding...`,
  x: 375,
  y: 335,
};

let gameTitle = {
  // Creates custom object for main heading.
  string: `I'm not a Robot`,
  x: 375,
  y: 300,
};

let gameStart = {
  // Creates custom object for secondary heading.
  string: `Press "Enter" to play`,
  x: 375,
  y: 375,
};

let gameObjective = {
  // Creates custom object for teritary heading.
  string: `OBJECTIVE: Complete the various puzzles to prove that you are human.`,
  x: 375,
  y: 600,
};

let gameControl = {
  // Creates custom object for fourth heading.
  string: `CONTROLS: Vary depending on puzzles. Follow on screen instruction.`,
  x: 375,
  y: 635,
};

let gameNote = {
  // Creates custom object for fifth heading.
  string: `NOTE: Allow the web broswer to access audio & video inputs for the full experience.`,
  x: 375,
  y: 670,
};

let audioPuzzleHeading = {
  // Creates custom object for main heading.
  string: `Use your voice to navigate the ball upwards.`,
  x: 375,
  y: 100,
};

let audioPuzzleSubHeading = {
  // Creates custom object for secondary heading.
  string: `Perhaps the left and right arrows keys may help? Avoid obstacles at all costs.`,
  x: 375,
  y: 135,
};

let ballPuzzleHeading = {
  // Creates custom object for primary heading.
  string: `Splendid! Now you must successfully collect all the tokens.`,
  x: 375,
  y: 100,
};

let ballPuzzleSubHeading = {
  // Creates custom object for secondary heading.
  string: `The catch! Complete this task within 6 repetitions of the F Minor scale`,
  x: 375,
  y: 135,
};

let ballPuzzleTertiaryHeading = {
  // Creates custom object for teritary heading.
  string: `Collect the tokens by bouncing the balls into them. A mouse click might help...`,
  x: 375,
  y: 170,
};

let cameraRiddleHeading = {
  // Creates custom object for primary heading.
  string: `Very good. Solve the riddle... A mouse press might help?`,
  x: 375,
  y: 93.75,
};

let cameraRiddleSubHeading = {
  // Creates custom object for secondary heading.
  string: `Type the answer. Press the "ENTER" key when ready.`,
  x: 375,
  y: 575,
};

let cameraRiddleAnswerHeading = {
  // Creates custom object for answer heading.
  string: `Answer:`,
  x: 300,
  y: 628,
};

let cameraLoadingHeading = {
  // Creates custom object for primary heading.
  string: `Hmm, you're starting to appear as human... One more test.`,
  x: 375,
  y: 100,
};

let finalCheckHeading = {
  // Creates custom object for secondary heading.
  string: `Wow, maybe you actually are human?`,
  x: 375,
  y: 100,
};

let finalCheckSubHeading = {
  // Creates custom object for Primary heading.
  string: `Lets try this again...`,
  x: 375,
  y: 135,
};

let finalStartButtonText = {
  // Creates custom object for Primary heading.
  string: `I'm not a Robot`,
  x: 375,
  y: 300,
};

let gameSuccess = {
  // Creates custom object for Primary heading.
  string: `You're not a Robot`,
  x: 375,
  y: 375,
};

let gameFail = {
  // Creates custom object for Primary heading.
  string: `You must re-start the simulation for security reasons.`,
  x: 375,
  y: 375,
};

let staticBg = {
  // Creates random static dots
  numStatic: 500,
  strokeWeight: 2,
  stroke: {
    r: 255,
    g: 255,
    b: 0,
  },
};

let fontSize = {
  // Creates custom object for various font sizes.
  vSmall: 12,
  small: 16,
  medium: 56,
  large: 72,
};

let startButton = {
  // Creates parameters for start button
  x: undefined,
  y: undefined,
  size: 100,
  fill: 255,
  highLightFill: 128,
  normalFill: 255,
  disappear: false,
};

let finalStartButton = {
  // Creates parameters for final start button
  x: undefined,
  y: undefined,
  size: 100,
  fill: 255,
  highLightFill: 128,
  normalFill: 255,
  disappear: false,
};

let flashCamera = {
  // Creates parameters for camera flash
  x: 375,
  y: 375,
  size: 1,
  fill: 255,
};


// PRELOAD
function preload() {
  // P5 function that loads assets in prior to starting the simulation.
  clickSFX = loadSound(`./assets/sounds/click.mp3`); // Preloads the "click" for efficient load times.
  congratsSFX = loadSound(`./assets/sounds/congrats.mp3`); // Preloads the "congarts" for efficient load times.
  cameraFlashSFX = loadSound(`./assets/sounds/cameraFlash.mp3`); // Preloads the "cameraFlash" for efficient load times.
  ballPuzzleJingleSFX = loadSound(`./assets/sounds/ballPuzzleJingle.mp3`); // Preloads the "ballPuzzleJingle" for efficient load times.
  staticSFX = loadSound(`./assets/sounds/static.mp3`); // Preloads the "static" for efficient load times.
  successSFX = loadSound(`./assets/sounds/success.mp3`); // Preloads the "success" for efficient load times.

  riddleText = loadStrings("./assets/text/riddle.txt"); // Preloads the "riddle" txt file efficient load times.
  simFont = loadFont("assets/fonts/Ge_Body.ttf"); // Preloads the custom downloaded font for efficient load times.
}


// SETUP
function setup() {
  // Executes the lines of code contained inside its block.
  createCanvas(750, 750); // Sets the Canvas width and height.
  generateRobotButton(); // Function that dictates button coordinates.
  generateFinalRobotButton(); // Function that dictates button coordinates.
  generateAudioInput(); // Function that is called to start Audio Input.
  delayVirus(); // Function that sets a timmer to virus function.
  generateAudioBall(); // Function that generates audio ball and coordinates.

  generatePaddle(); // Function that is called to generate the paddle.
  generateToken(); // Function that is called to generate the token.
  mousePressed(); // Function that us generated to allow for mousePressed function
  spawnInitialBalls(); // Function that is called to generate the first emergency ball.

  generateTextFade(); // Function that is called to create text fade.
  generatePolySynth(); // Function that is called to start Poly Synth.
}

function delayVirus() {
  setTimeout(showInstruction, 3000); // Sets timer value to function
}

function showInstruction() {
  startInstructionVisible = true; // Makes the function show by default
}

function generateRobotButton() {
  startButton.x = width / 2; // Postions start buttons x-axis location.
  startButton.y = height / 1.75; // Postions start buttons y-axis location.
}

function generateFinalRobotButton() {
  finalStartButton.x = width / 2; // Postions final start buttons x-axis location.
  finalStartButton.y = height / 1.75; // Postions final start buttons y-axis location.
}

function generateAudioInput() {
  mic = new p5.AudioIn(); // Links to p5 AudioIn Library.
  mic.start(); // Starts microphone input.
}

function generateAudioBall() {
  let x = width / 2; // Postions AudioBall's start location on the x-axis.
  let y = height; // Postions AudioBall's start location on the y-axis.
  // Function called in AudioBall class.
  audioBall = new AudioBall(x, y); // Calls class and sets AudioBall's width and height.
}

function generatePaddle() {
  // Function called in paddle class.
  paddle = new Paddle(300, 20); // Calls class and sets paddles width and height statically.
}

function generateToken() {
  // Function called in setup.
  for (let i = 0; i < numTokens; i++) {
    // Create our Tokens by counting up to the number of the Tokens.
    let horizontal = random(0, width); // Set a random x position.
    let vertical = random(100, 650); // set a random y postion.
    let tokenSize = random(25, 50); // set a random size.
    let centreColor = {
      // Provide a colour to the inside of the token.
      r: 255,
      g: 153,
      b: 51,
    };
    let outerColor = {
      // Provide a colour to the outside of the token.
      r: 255,
      g: 255,
      b: 0,
    };
    let token = new Token(
      horizontal,
      vertical,
      tokenSize,
      centreColor,
      outerColor
    ); // Calls class and sets parameters
    tokens.push(token); // Adds the token to the array of tokens.
  }
}

function generateTextFade() {
  textFade = 0; // Starts text as transparent.
}

function generatePolySynth() {
  userStartAudio(); // Starts synth libraries.
  synth = new p5.PolySynth(); // Links to p5 PolySynth library.
}


// DRAW
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
  else if (state === `cameraRiddle`) {
    cameraRiddle();
  }
  else if (state === `cameraFlash`) {
    cameraFlash();
  }
  else if (state === `cameraLoad`) {
    cameraLoad();
  }
  else if (state === `cameraPuzzle`) {
    cameraPuzzle();
  }
  else if (state === `finalCheck`) {
    finalCheck();
  }
  else if (state === `winner`) {
    winner();
  }
  else if (state === `loser`) {
    loser();
  }
}


// FALSESTART STATE
function falseStart() {
  // Main landing state code.
  background(0); // Displays the background colour as black.

  displayFalseStartText(); // Function that displays "I'm not a Robot" text.
  startButtonHighLight(); // Function that makes button highlight.
  startButtonOverlap(); // Function that makes mouse over highlight.
  displayStartButton(); // Function that displays start button.
}

function displayFalseStartText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 56px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameFalseStart.string, gameFalseStart.x, gameFalseStart.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}

function startButtonHighLight() {
  // Highlight function for start button.
  let d = dist(mouseX, mouseY, startButton.x, startButton.y);
  if (d < startButton.size / 2) {
    startButton.fill = startButton.highLightFill; // Changes fill to highlight when mouse over.
    cursor(HAND); // Change cursor to hand icon.
  }
  else {
    startButton.fill = startButton.normalFill; // Changes fill to highlight when mouse over.
    cursor(ARROW); // Change cursor to pointer icon.
  }
}

function startButtonOverlap() {
  let d = dist(mouseX, mouseY, startButton.x, startButton.y); // Sets variable to mouse postion to final start button x and y.
  if (d < startButton.size / 2) { // Finds middle point of button.
    return true;
  } else {
    return false;
  }
}

function displayStartButton() {
  if (!startButton.disappear) {
    push(); // Isolates code from using global properties.
    noStroke();
    fill(startButton.fill); // Fill final start buttion with specified colour.
    rectMode(CENTER); // Dictates the text alignment style.
    rect(startButton.x, startButton.y, startButton.size); // Dictates location of rectangle.
    pop(); // Isolates code from using global properties.
  }
}


// ERROR STATE
function error() {
  // Main landing state code.
  background(0); // Displays the background colour as black.
  displayErrorText();

  virus();
  errorWaitTime();
}

function displayErrorText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 56px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255, 0, 0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  noStroke();
  text(gameError.string, gameError.x, gameError.y); // Displays the title of the game.
  cursor(ARROW);
  pop();
}

function virus() {
  if (startInstructionVisible) {
    for (let i = 0; i < staticBg.numStatic; i++) {
      // makes a single point increase every frame.
      let x = random(0, width); // Sets a random point postion.
      let y = random(0, height); // Sets a random point postion.
      strokeWeight(staticBg.strokeWeight); // Indicates the point's size / weight.
      stroke(staticBg.stroke.r, staticBg.stroke.g, staticBg.stroke.b); // Sets the points colour to yellow.
      point(x, y); // Indicates that the points will be dsiplayed at random Coordinates.

      if (!staticSFX.isPlaying()) {
        // States that if the click sound effect is not playing, it will be played everytime a ball touches the paddle.
        staticSFX.play(); // Play static while the static is displayed on screen.
      }
    }
  }
}

function errorWaitTime() {
  // Main code for dynamic game clock.
  if (frameCount % 60 == 0 && autoTimer > 0) {
    // Indicates that if the frameCount is divisible by 60, then a second has passed.
    autoTimer--;
  }
  if (autoTimer == 0 && state === `error`) {
    // If the timer hits zero (0), then...
    state = `instructions`; // Run the loser state.
    staticSFX.stop(); // Stop the song from being played
  }
}


// INSTRUCTIONS STATE
function instructions() {
  // Main landing state code.
  background(0); // Displays the background colour as black.
  displayInstructionsText();

  instructionsWaitTime();
}

function displayInstructionsText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 56px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  noStroke();
  text(gameIntroTextLine1.string, gameIntroTextLine1.x, gameIntroTextLine1.y); // Displays the title of the game.
  text(gameIntroTextLine2.string, gameIntroTextLine2.x, gameIntroTextLine2.y); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.
}


// LANDING STATE
function landing() {
  // Main landing state code.
  background(0); // Displays the background colour as black.
  displayLandingHeadingText();
  displayLandingText();
}

function instructionsWaitTime() {
  // Main code for dynamic game clock.
  startLandingTimer += 1;
  if (startLandingTimer >= 300) {
    state = `landing`;
  }
}

function displayLandingHeadingText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 56px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(0, 255, 0); // Makes the fontred in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  noStroke(); // Removes stoke from text.
  text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}

function displayLandingText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 56px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  noStroke(); // Removes stoke from text.
  text(gameStart.string, gameStart.x, gameStart.y); // Displays header text.
  text(gameObjective.string, gameObjective.x, gameObjective.y); // Displays secondary text.
  text(gameControl.string, gameControl.x, gameControl.y); // // Displays tertiary text.
  text(gameNote.string, gameNote.x, gameNote.y); // // Displays fourth text.
  pop(); // Isolates code from using global properties.
}


// AUDIO PUZZLE STATE
function audioPuzzle() {
  // Main landing state code.
  background(125); // Displays the background colour as black.

  displayAudioPuzzleText(); // Function that displays puzzle text.
  audioBallResources(); // Funtion that groups audioBall class functions together.
  audioObstacleTimer(); // Function that calls obstacle timer.
  audioObstacleStates(); // Function that calls obstacle states.
  audioPuzzleJingle(); // Function that calls background song.
}

function displayAudioPuzzleText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 56px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  noStroke(); // Removes stoke from text.
  text(audioPuzzleHeading.string, audioPuzzleHeading.x, audioPuzzleHeading.y); // Displays header text.
  text(audioPuzzleSubHeading.string, audioPuzzleSubHeading.x, audioPuzzleSubHeading.y); // Displays secondary text.
  pop(); // Isolates code from using global properties.
}

function audioBallResources() {
  audioBall.handleInput(); // Function within audioBall class that focuses on audio input and keyboard input.
  audioBall.move(); // Function within audioBall class to add velocty to audioBall.
  audioBall.display(); // Function within audioBall class to display audioBall.
}

function audioObstacleTimer() {
  audioPuzzletimer -= 0.75; // Update our timer by counting down by a 75th of a frame.

  if (audioPuzzletimer <= 0) {
    // Check if our timer hit zero.
    let y = random(0, 600); // Choose a random y position.
    let r = random(0, 1); // Generate a random number for probability.
    let obstacle = undefined; // We're going to randomly create a vehicle in this variable.

    if (r < 0.5) {
      // Use comparisons with r to randomly create one of two types of obstacles. Always create them at an x of 0 so they start on one side of the screen and translate horizontaly.
      obstacle = new BigObstacle(0, y); // Calls BigObstacle class and sets parameters.
    }
    else {
      obstacle = new SmallObstacle(0, y); // Calls SmallObstacle class and sets parameters.
    }

    r = random(0, 1); // Generate another random number to control which direction the new obstacles will move in
    if (r < 0.1) {
      // Half the time left and half the time right. We also multiply the speed by a random number so that there's some variance between different
      obstacle.vx = -obstacle.speed * random(0.5, 0.7); // Sets obstacle random left moving velocty.
    }
    else {
      obstacle.vx = obstacle.speed * random(0.5, 0.7); // Sets obstacle random right moving velocty.
    }

    obstacles.push(obstacle); // Add new obstacles to the simulation by adding it to the array
    audioPuzzletimer = addobstacleInterval; // Reset timer
  }
}

function audioObstacleStates() {
  // Go through all the obstacles currently in the simulation
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    // Call its basic methods
    obstacle.move(); // Function within obstacle class that focuses on move input.
    obstacle.wrap(); // Function with obstacle class that focuses on wrap input.
    obstacle.display(); // Function with obstacle class that focuses on display.

    audioBall.checkHit(obstacle); // Check whether the audioBall hit the obstacle
  }

  if (!audioBall.alive) {
    // If the audioBall hits an obstacle...
    state = `loser`; // Go to loser state.
    ballPuzzleJingleSFX.stop(); // Stop the song from being played.
  }

  if (audioBall.y < 0) {
    // If the audioBall makes it past the top of the canvas...
    state = `ballPuzzle`; // Switch to the ballPuzzle state.
    ballPuzzleJingleSFX.stop(); // Stop the song from being played.
  }
}

function audioPuzzleJingle() {
  if (!ballPuzzleJingleSFX.isPlaying()) { // If not playing, play...
    // States that if the click sound effect is not playing, it will be played everytime a ball touches the paddle
    if (state === `audioPuzzle`) { // Only play if it audioPuzzle state
      ballPuzzleJingleSFX.play(); // Play track
      loop(); // Restart the song when it finishes
    }
  }
}


// BALL PUZZLE STATE
function ballPuzzle() {
  // Main landing state code.
  background(50); // Displays the background colour as dark grey.
  displayBallPuzzleText();

  updatePaddle(); // Function within paddle class that calls the paddles move and display properties.
  updateToken(); // Function within paddle class that calls the number of token's Forloop.
  updateBall(); // Function wihtin paddle class that calls the number of ball's Forloop.
}

function displayBallPuzzleText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 16px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255); // Makes the font white in colour.
  noStroke(); // Removes stoke from text.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text (ballPuzzleHeading.string, ballPuzzleHeading.x, ballPuzzleHeading.y); // Displays the heading text.
  text (ballPuzzleSubHeading.string, ballPuzzleSubHeading.x, ballPuzzleSubHeading.y); // Displays the secondary text.
  text (ballPuzzleTertiaryHeading.string, ballPuzzleTertiaryHeading.x, ballPuzzleTertiaryHeading.y); // Displays the tertiary heading
  pop(); // Isolates code from using global properties.
}

function updatePaddle() {
  // Calls the function in Simulation
  paddle.move(); // links to move class in Paddle.js
  paddle.display(); // links to display class in Paddle.js
}

function updateToken() {
  // Function that is called in simulation
  let numActiveTokens = 0; // A variable to count how many active tokens we find this frame
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]; // Sets token variable to an Infinite amount in the array.
    if (token.view) {
      // Says, if the tokens are visble, do the following...
      numActiveTokens++; // Since this is active, add one to our count.
      token.display(); // links to the dispay class in Token.js
    }
  }
  if (numActiveTokens === 0) {
    // If we counted zero (0) active token, then change state to winner.
    clearInterval(interval); // Clear the interval and set interval
    interval = undefined; // Back to undefined to stop synth.
    state = `cameraRiddle`; // Swaps to cameraLoad state.
  }
}

function spawnInitialBalls() {
  // Function that is called in setup to generate balls
  balls = []; // Set an array for "balls"
  for (let i = 0; i < numBalls; i++) {
    // Store the current ball in a variable
    let x = random(0, width); // Let the x position be anywhere on the canvas
    let y = random(-400, -100); // Let the y position be anywhere on the canvas
    let ball = new Ball(x, y, clickSFX); // Calls class and sets parameters
    balls.push(ball); // Allows ball to generate dpedning on the amount set in numBalls
  }
}

function updateBall() {
  // Function that is called in simulation
  let numActiveBalls = 0; // A variable to count how many active balls we find this frame
  for (let i = 0; i < balls.length; i++) {
    // Store the current ball in a variable
    let ball = balls[i]; // sets the ball variable to the balls array.
    if (ball.view) {
      // Says, if the ball is visble, do the following...
      numActiveBalls++; // Since this is active, add one to our count
      ball.gravity(gravityForce); // Apply gravity, move, bounce, and display. Called in Ball.js
      ball.move(); // Apply move. Called in Ball.js
      ball.bounce(paddle); // Apply bounce. Called in Ball.js
      ball.display(); // Apply display. Called in Ball.js

      for (let j = 0; j < tokens.length; j++) {
        let token = tokens[j]; // Sets the token variable to the tokens array.
        if (token.view) {
          // Says, if the tokens are visble, do the following...
          ball.tryToTouchToken(token); // runs function to check overlap. Called in Token.js
        }
      }
    }
  }
  if (numActiveBalls === 0) {
    // If we counted zero (0) active balls, then change state to loser.
    clearInterval(interval); // Clear the interval and set interval
    interval = undefined; // Back to undefined to stop synth.
    state = `loser`; // Swaps to loser state.
  }
}

function playNextNote() {
  // playNextNote() plays the next note in our array
  if (state === `ballPuzzle`) {
    let note = notes[currentNote]; // Chose the note at the current position
    synth.play(note, 0.2, 0.2, 0.2); // Play the synth
    currentNote = currentNote + 1; // Increase the current position and go back to 0 when we reach the end

    if (currentNote === notes.length) {
      clearInterval(interval); // Clear the interval and set interval
      interval = undefined; // Back to undefined to stop synth.
      state = `loser`;
    }
  }
}


// CAMERA RIDDLE STATE
function cameraRiddle() {
  background(100); // Sets background colour to light grey.
  displayCameraText(); // Displays camera riddle primary text.
  displayRiddleBlock(); // Displays camera riddle white block.
  displayRiddleText(); // Displays the riddle text from riddle.txt
  displayAnswerField(); // Displays the text that generates from keyTyped.
}

function displayCameraText() {
  push(); // Isolates code from using global properties.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255); // Make font black in colour.
  textSize(fontSize.small); // Displays the font size as 16px.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(cameraRiddleHeading.string, cameraRiddleHeading.x, cameraRiddleHeading.y); // Displays the heading text.
  text(cameraRiddleSubHeading.string, cameraRiddleSubHeading.x, cameraRiddleSubHeading.y); // Displays the secondary text.
  text(cameraRiddleAnswerHeading.string, cameraRiddleAnswerHeading.x, cameraRiddleAnswerHeading.y); // Displays the tertiary text.
  rectMode(CENTER); // Dictates that rectangle is drwn from centre point
  noStroke(); // Removes stoke from text.
  rect(410, 635, 150, 1); // Creates indicated text line.
  pop(); // Isolates code from using global properties.
}

function displayRiddleBlock() {
  push(); // Isolates code from using global properties.
  rect(50, 245, 650, 20); // White rectangle that covers the first riddle sentence
  rect(50, 270, 650, 20); // White rectangle that covers the second riddle sentence
  rect(50, 295, 650, 20); // White rectangle that covers the third riddle sentence
  rect(50, 320, 650, 20); // White rectangle that covers the fourth riddle sentence
  rect(50, 345, 650, 20); // White rectangle that covers the fifth riddle sentence
  rect(50, 370, 650, 20); // White rectangle that covers the sixth riddle sentence
  fill(255); // Fills blocks with white in colour
  pop(); // Isolates code from using global properties.
}

function displayRiddleText() {
  textSize(fontSize.small); // Displays the font size as 16px.
  noStroke(); // Removes stoke from text.
  textAlign(LEFT, TOP); // Dictates the text alignment style.

  for (let i = 0; i < riddleText.length; i++) {
    // Array for text
    let words = riddleText[i].split(); // Divides text into multiple lines.
    let currentOffset = 0; // Indaictes a 0 offset.

    for (let j = 0; j < riddleText.length; j++) {
      // Array for visible blocks
      let wordBlock = riddleText[j].split(); // Divides text blocks into multiple lines.

      if (mouseIsPressed) {
        // mousePressed function to view the riddle.
        push(); // Isolates code from using global properties.
        textFont(simFont); // Changes the font from the default to a custom font.
        fill(0); // Makes text white in colour
        text(words[j], 75 + currentOffset, 250 + i * 25); // Displays the array of text.
        pop(); // Isolates code from using global properties.
      }

      currentOffset += wordBlock + 4; // four pixels between words
    }
  }
}

function displayAnswerField() {
  textFont(simFont); // Changes the font from the default to a custom font.
  text(letters, width / 2, height / 1.21); // Coordinates that state where the keytyped content will appear.
}


// CAMERA FLASH STATE
function cameraFlash() {
  push(); // Isolates code from using global properties.
  background(0);
  noStroke();
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(flashCamera.fill); // Flash camera black in colour.
  rectMode(CENTER); // Dictates the text alignment style.
  ellipse(flashCamera.x, flashCamera.y, flashCamera.size); // Draws ellipse and indicated coordinates.
  pop(); // Isolates code from using global properties.

  quickFlash(); // Calls function that animated ellipse to represent camera flash.
}

function quickFlash() {
  flashCamera.size = flashCamera.size + 75; // Starts with camera's size and adds 75 FPS for fast animation.
  if (flashCamera.size > 750) state = `cameraLoad`;{ // When ellipse becomes larger then 750px, then switch to cameraLoad state.
    if (!cameraFlashSFX.isPlaying()) { // If cameraFlash is not playing, then...
      cameraFlashSFX.play(); // Play cameraFlashSFX.
    }
  }
}


// CAMERA LOAD STATE
function cameraLoad() {
  background(255); // Sets background to white in colour.
  displayLoadingText(); // Displays loading text.
  webcamDetection(); // Intiates camera detection.
}

function displayLoadingText() {
  // Displays the webcam. If there are currently objects detected it outlines them and labels them with the name and confidence value.
  push(); // Isolates code from using global properties.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(0); // Make font black in colour.
  textSize(fontSize.small); // Displays the font size as 16px.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(cameraLoadingHeading.string, cameraLoadingHeading.x, cameraLoadingHeading.y); // Displays the heading text.
  text(`Loading ${modelName}...`, width / 2, height / 2); // Displays the loading text.
  pop(); // Isolates code from using global properties.
}

function webcamDetection() {
  video = createCapture(VIDEO); // Start the CocoSsd model and when it's ready start detection
  video.hide(); // Hide the resulting HTML capture element

  cocossd = ml5.objectDetector("cocossd", {}, function () {
    // Ask CocoSsd to start detecting objects, calls gotResults if it finds something
    cocossd.detect(video, gotResults);
    state = `cameraPuzzle`; // Switch to the cameraPuzzle state
  });
}

function gotResults(err, results) {
  // Called when CocoSsd has detected at least one object in the video feed
  if (err) {
    // If there's an error, report it
    console.error(err);
  }
  else {
    // Otherwise, save the results into our predictions array
    predictions = results;
  }
  cocossd.detect(video, gotResults); // Ask CocoSsd to detect objects again so it's continuous

  if (state === `finalCheck`) { // Attempting to stop cocossd once in finalCheck state. Not working...
      cocossd.disappear = true; // Attempting to stop cocossd once in finalCheck state. Not working...
    }
}

// CAMERA PUZZLE STATE
function cameraPuzzle() {
  cameraPrediction(); // Calls function that uses ml5 to predict objects.
}

function cameraPrediction() {
  image(video, 0, 0, width, 600); // Display the webcam

  if (predictions) {
    // Check if there currently predictions to display
    for (let i = 0; i < predictions.length; i++) {
      // If so run through the array of predictions
      // Get the object predicted
      let object = predictions[i];

      if (object.label === `person` && object.confidence > 0.93) { // Indiactes that the state will chnage if the detected object is a person, and if the confidence is at least 93%.
        state = `finalCheck`; // Chnage state
        if (!successSFX.isPlaying()) { // If successSFX is not playing, then...
          successSFX.play(); // Play successSFX.
        }
      }
      else {
        highlightObject(object); // Highlight the object on the canvas with a bounding box.
      }
    }
  }
}

function highlightObject(object) {
  // Provided with a detected object it draws a box around it and includes its label and confidence value
  push(); // Isolates code from using global properties.
  textFont(simFont); // Changes the font from the default to a custom font.
  noFill(); // Removes object fill.
  stroke(255, 255, 0); // Apply a green bounding box to the detected object.
  rect(object.x, object.y, object.width, object.height); // Display a box around it
  pop(); // Isolates code from using global properties.

  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 16px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255, 255, 0); // Apply a green bounding box to the detected object.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(
    `${object.label}, ${object.confidence.toFixed(2)}`,
    object.x + object.width / 2,
    object.y + object.height / 2
  ); // Display the label and confidence in the center of the box.
  pop(); // Isolates code from using global properties.
}


// FINAL CHECK STATE
function finalCheck() {
  // Main landing state code.
  background(0); // Displays the background colour as black.
  finalFadeTextCheck(); // Display heading and secondary text.
  finalDisplayFalseStartText(); // Display "I'm not a Robot" text.
  finalStartButtonHighLight(); // Function that makes button highlight.
  finalStartButtonOverlap(); // Function that makes mouse over highlight.
  finalDisplayStartButton(); // Function that displays start button.
}

function finalFadeTextCheck() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 56px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255, textFade); // Display font as white and slowy fade in.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(finalCheckHeading.string, finalCheckHeading.x, finalCheckHeading.y); // Display Primary heading.
  text( finalCheckSubHeading.string, finalCheckSubHeading.x, finalCheckSubHeading.y); // Display Secondary heading.
  pop(); // Isolates code from using global properties.

  if (textFade < 0) textFadeAmount = 10; { // State text fade amount from transparent to full
    textFade = textFade + textFadeAmount; // Add text fade each FPS.
  }
}

function finalDisplayFalseStartText() {
  push(); // Isolates code from using global properties.
  textFont(simFont); // Changes the font from the default to a custom font.
  textSize(fontSize.medium); // Displays the font size as 56px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(finalStartButtonText.string, finalStartButtonText.x, finalStartButtonText.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}

function finalStartButtonHighLight() {
  // Highlight function for start button.
  let d = dist(mouseX, mouseY, finalStartButton.x, finalStartButton.y); // Sets variable to mouse postion to final start button x and y.
  if (d < finalStartButton.size / 2) { // Finds middle point of button.
    finalStartButton.fill = finalStartButton.highLightFill; // Changes fill to highlight when mouse over.
    cursor(HAND); // Change cursor to hand icon.
  }
  else {
    finalStartButton.fill = finalStartButton.normalFill; // Changes fill to highlight when mouse over.
    cursor(ARROW); // Change cursor to pointer icon.
  }
}

function finalStartButtonOverlap() {
  let d = dist(mouseX, mouseY, finalStartButton.x, finalStartButton.y); // Sets variable to mouse postion to final start button x and y.
  if (d < finalStartButton.size / 2) { // Finds middle point of button.
    return true;
  }
  else {
    return false;
  }
}

function finalDisplayStartButton() {
  if (!finalStartButton.disappear) {
    push(); // Isolates code from using global properties.
    noStroke();
    fill(finalStartButton.fill); // Fill final start buttion with specified colour
    rectMode(CENTER); // Dictates the text alignment style.
    rect(finalStartButton.x, finalStartButton.y, finalStartButton.size); // Dictates location of rectangle.
    pop(); // Isolates code from using global properties.
  }
}


// WINNER STATE
function winner() {
  // Main landing state code.
  background(0); // Displays the background colour as black.
  winnerText(); // Displays winner text.
  finalJingleDelay(); // Call jingle and apply timer.
}

function winnerText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.large); // Displays the font size as 82px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(0, 255, 0); // Makes the red white in colour.
  noStroke();
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameSuccess.string, gameSuccess.x, gameSuccess.y); // Displays game success!
  pop(); // Isolates code from using global properties.
}

function finalJingleDelay() {
  if (frameCount % 1 == 0 && autoTimer > 0 && state === `winner`) {
    // Cheat to allow sound to play upon a state starting.
    autoTimer--;
    if (!congratsSFX.isPlaying()) {
      // States that if the click sound effect is not playing, it will be played everytime a ball touches the paddle
      congratsSFX.play();
    }
  }
}


// LOSER STATE
function loser() {
  // Main landing state code.
  background(0); // Displays the background colour as black.
  loserText(); // Displays loser text.
}

function loserText() {
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 16px.
  textFont(simFont); // Changes the font from the default to a custom font.
  fill(255, 0, 0); // Makes the red white in colour.
  noStroke();
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameFail.string, gameFail.x, gameFail.y); // Displays the title of the game.
  pop(); // Isolates code from using global properties.
}


// MOUSE PRESS FUNCTION
function mousePressed() {
  // FALSE START CODE
  if (state === `falseStart`) { // If state is equal to falseStart then...
    let d = dist(mouseX, mouseY, startButton.x, startButton.y); // Sets variable to mouse postion to final start button x and y.
    if (d < startButton.size / 2) { // Finds middle point of button.
      startButton.disappear = true; // Hide start button after click.
      state = `error`; // Chnage state to winner upon click.
    }
  }

  // FINAL CHECK CODE
  if (state === `finalCheck`) { // If state is equal to falseStart then...
    let d = dist(mouseX, mouseY, finalStartButton.x, finalStartButton.y); // Sets variable to mouse postion to final start button x and y.
    if (d < finalStartButton.size / 2) { // Finds middle point of button.
      finalStartButton.disappear = true; // Hide start button after click.
      state = `winner`; // Chnage state to winner upon click.
    }
  }


  // ADDTIONAL BALL CODE
  if (state === "ballPuzzle") {
    // Says only apply the below if in simulation state.
    let x = mouseX; // Makes the mouse capable of clicking on a x postion.
    let y = mouseY; // Males the mouse capable of clicking on a y postion.

    for (let i = balls.length; i < numBalls + numEmergencyBalls; i++) {
      // spawn only the balls that do not yet exist in the array until the array length reach the number of balls desired by the sum of balls + numEmergencyBalls.
      let ball = new Ball(x, y, clickSFX); // Calls class and sets parameters.
      balls.push(ball); // Allows ball to generate dpedning on the amount set in numEmergencyBalls.
    }
  }


  // POLYSYNTH START AND STOP CODE
  if (interval === undefined) {
    // First check that the piano isn't already playing. The interval will be undefined if it hasn't started
    interval = setInterval(playNextNote, 500); // Start our interval, calling playRandomNote every 500 milliseconds. Assign the result to interval to remember the interval
  }
}


// KEYTYPED FUNCTION
function keyTyped() {
  if (state === `cameraRiddle`) { // If the state is in cameraRiddle then...
    letters = letters + key; // Add key function to each pressed letter.
  }
}


// KEYPRESSED FUNCTION
function keyPressed() {
  // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) {
    // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
    state = `audioPuzzle`; // Runs the "simulation" state.
  }

  if (state === `cameraRiddle`) {
    if (keyCode === BACKSPACE) { // Allows the "Backspace" key remove previous letters.
      letters = letters.slice(0, letters.length - 1); // This is a way to remove the last character in a string!
    }
    else if (letters === `webcam`) { // Change state to cameraFlash if user types in "webcam" followed by "Enter".
      state = `cameraFlash`; // Swaps to cameraFlash STATE.
    }
  }
}
