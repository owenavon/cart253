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
  string: `Error`,
  x: 375,
  y: 375,
}

let gameIntroText = { // Creates custom object for main heading.
  string: `You thought it would be that Easy? You must prove that you are infact human before proceeding.`,
  x: 375,
  y: 300,
}

let gameInstructions = {
  string: `When ready, start the tests, but beware that you must respond correclty, who there will be consequences.`,
  x: 500,
  y: 400,
}

let gameTitle = { // Creates custom object for main heading.
  string: `i'm not a robot`,
  x: 375,
  y: 300,
}

let gameStart = { // Creates custom object for secondary heading.
  string: `Press "Enter" to play`,
  x: 375,
  y: 375,
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

// let startButton = {
//   x: undefined,
//   y: undefined,
//   size: undefined
// };

function setup () { // Executes the lines of code contained inside its block.
  createCanvas (750, 750); // Sets the Canvas width and height.
  generateTokens();
  delayVirus();
  // generateRobotButton();
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
  setTimeout(showInstruction, 2000);
}

function showInstruction () {
  startInstructionVisible = true;
}

// function generateRobotButton() {
//   startButton.x = width / 2;
//   startButton.y = height / 2;
// }

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
  // else if (state === `puzzle1`) {
  //   puzzle1 ();
  // }
  // else if (state === `puzzle2`) {
  //   puzzle2 ();
  // }
  // else if (state === `puzzle3`) {
  //   puzzle3 ();
  // }
  // else if (state === `winner`) {
  //   winner ();
  // }
  // else if (state === `loser`) {
  //   loser ();
  // }
}

function falseStart() { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameFalseStart.string, gameFalseStart.x, gameFalseStart.y); // Displays the title of the game.
  noStroke();
  fill(255);

  ellipse(50, 150, 250, 350);

  // startButtonOverlap();
  pop(); // Isolates code from using global properties.
}

// function startButtonOverlap() {
//   let d = dist(mouseX, mouseY, startButton.x, startButton.y);
//   if (d < startButton.size / 2) {
//     state = `error`;
//   }
//
//   push();
//   noStroke();
//   fill(255);
//   ellipse(startButton.x, startButton.y, startButton.size);
//   pop();
// }

function error() { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(255, 0, 0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameError.string, gameError.x, gameError.y); // Displays the title of the game.
  updateTokens();
  virus();
  waitTime();
  pop(); // Isolates code from using global properties.
}

function instructions () { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameIntroText.string, gameIntroText.x, gameIntroText.y); // Displays the title of the game.
  text(gameInstructions.string, gameInstructions.x, gameInstructions.y); // Displays the text that dictates what the user must press to start the game.
  pop(); // Isolates code from using global properties.
}

function landing () { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(0); // Displays the background colour as black.
  textSize(fontSize.medium); // Displays the font size as 32px.
  fill(0, 255, 0); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  text(gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
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

function updateTokens() { // Function that is called in simulation
  let numActiveTokens = 0; // A variable to count how many active tokens we find this frame
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]; // Sets token variable to an Infinite  amount in the array.
    if (token.view) { // Says, if the tokens are visble, do the following...
      numActiveTokens++; // Since this is active, add one to our count.
      token.display(); // links to the dispay class in Token.js
    }
  }
}

function waitTime() { // Main code for dynamic game clock.
  if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    timer --;
  }
  if (timer == 0 && state === `error` ) { // If the timer hits zero (0), then...
    state = `instructions`; // Run the loser state.
  }
}

// function mousePressed() {
//   if (state === `falseStart`) {
//     state = `error`;
//   }
// }

// function mouseIsInsideBalloon(balloon) {
//   // Calculate the distance between the mouse and the balloon
//   let d = dist(mouseX, mouseY, balloon.x, balloon.y);
//   // If it's inside the ballon return true, otherwise false
//   if (d < balloon.size / 2) {
//     return true;
//   } else {
//     return false;
//   }
// }


function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
    state = `puzzle1`; // Runs the "simulation" state.
  }
}
