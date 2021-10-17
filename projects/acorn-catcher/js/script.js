// Project 1 - Acorn Catcher
// Owen Avon

// The objective of this program, is for the user to collect as many falling accorns as possible. The use of a timer and scoreboard allows the game to become dynanmic and change it's direction depending on how the user navigates.

// See "README" for a detailed"game plan".

"use strict";

let brownAcorn = {
  x: 250,
  y: 0,
  size: 60,
  minSize: 50,
  maxSize: 70,
  vx: 0,
  vy: 0,
  minSpeed: 5,
  maxSpeed: 10,
  speed: 5,
};

let redAcorn = {
  x: 300,
  y: 50,
  size: 40,
  minSize: 30,
  maxSize: 50,
  vx: 0,
  vy: 0,
  minSpeed: 5,
  maxSpeed: 10,
  speed: 5,
};

let goldAcorn = {
  x: 350,
  y: 100,
  size: 20,
  minSize: 10,
  maxSize: 30,
  vx: 0,
  vy: 0,
  minSpeed: 5,
  maxSpeed: 10,
  speed: 5,
};

let basket = {
  x: 375,
  y: 730,
  size: 150,
  ax: 0,
  ay: 0,
  vx: 0,
  vy: 0,
  friction: 0.97,
  maxSpeed: 20,
  fill: 200
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

let gameSound = {
  simulationMusic: undefined,
  winnerMusic: undefined,
  winnerMusic: undefined,
  loserMusic: undefined
};

let simulationGraphic = {
  x: undefined,
  y: undefined,
  size: undefined,
  brownAcorn: undefined,
  redAcorn: undefined,
  goldAcorn: undefined,
  treeTop: undefined,
  cloudScape: undefined,
  basket: undefined
};

let fontSize = {
  small: 32,
  medium: 64,
  large: 96
};

let assetColour = {
  black: {
    r: 0,
    g: 0,
    b: 0,
  },
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  red: {
    r: 255,
    g: 0,
    b: 0,
  },
  yellow: {
    r: 255,
    g: 255,
    b: 0,
  }
};

let retroFont; // Defines custom font.
let score = 0; // Starts the score board at "0".
let timer = 25; // Sets the timer's value.
let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".

function preload () {
  retroFont = loadFont ("assets/fonts/Nintendo-DS-BIOS.ttf") // Preloads the custom downloaded font for efficient load times.

  simulationGraphic.treeTop = loadImage ("assets/images/treeTop.png") // Preloads the "treeTop" image for efficient load times.
  simulationGraphic.brownAcorn = loadImage ("assets/images/brownAcorn.png") // Preloads the "brownAcorn" image for efficient load times.
  simulationGraphic.redAcorn = loadImage ("assets/images/redAcorn.png") // Preloads the "redAcorn" image for efficient load times.
  simulationGraphic.goldAcorn = loadImage ("assets/images/goldAcorn.png") // Preloads the "goldAcorn" image for efficient load times.
  simulationGraphic.cloudScape = loadImage ("assets/images/cloudScape.png") // Preloads the "cloudScape" image for efficient load times.
  simulationGraphic.basket = loadImage ("assets/images/basket.png") // Preloads the "basket" image for efficient load times.

  gameSound.acornSFX = loadSound (`./assets/sounds/click.mp3`); // Preloads the "click" sound effect for efficient load times.
  gameSound.simulationMusic = loadSound (`./assets/sounds/simulationMusic.mp3`); // Preloads the "simulationMusic" for efficient load times.
  gameSound.winnerMusic = loadSound (`./assets/sounds/winnerMusic.mp3`); // Preloads the "winnerMusic" for efficient load times.
  gameSound.loserMusic = loadSound (`./assets/sounds/loserMusic.mp3`); // Preloads the "loserMusic" for efficient load times.
}

function setup () { // Executes the lines of code contained inside its block.
  createCanvas (750, 750); // Sets the Canvas width and height.
  setupCharacters (); // Calls the setupCharacters() function.
}

function setupCharacters () { // Dictates the three acorn characters.
  brownAcorn.x = random(0, width); // Indicates that the brownAcorn will appear at a random x postion.
  brownAcorn.vy = brownAcorn.speed; // Sets the brownAccorn's velocity.

  redAcorn.x = random(0, width); // Indicates that the redAcorn will appear at a random x postion.
  redAcorn.vy = redAcorn.speed; // Sets the redAcorn's velocity.

  goldAcorn.x = random(0, width); // Indicates that the goldAcorn will appear at a random x postion.
  goldAcorn.vy = goldAcorn.speed; // Sets the goldAcorn's velocity.
}

function draw() { // Location where code is excuted.
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
  background (assetColour.black.r, assetColour.black.g, assetColour.black.b); // Displays the background colour as black.
  textSize (fontSize.medium); // Displays the font size as 32px.
  fill (assetColour.white.r, assetColour.white.g, assetColour.white.b); // Makes the font white in colour.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  textFont (retroFont); // Changes the font from the default to a custom font.
  text (gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  text (gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
  landingInstructions (); // Calls a function within the landingInstructions state.
  landingAnimation (); // Calls a function within the landingAnimation state.
  pop (); // Isolates code from using global properties.
}

function landingInstructions() { // Text instructions for landing state.
  push (); // Isolates code from using global properties.
  textSize (fontSize.small); // Displays the font size as 32px.
  fill (assetColour.red.r, assetColour.red.g, assetColour.red.b); // Displays the instructions in red.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  textFont (retroFont); // Changes the font from the default to a custom font.
  text (`OBJECTIVE: Collect 500 acorn points within 25 seconds.`, width / 2, 600); // Displays on screen text slighly lower then the procceding text.
  text (`CONTROLS: Use the left and right arrow keys to move the basket.`, width / 2, 640); // Displays on screen near the bottom of the canvas.
  text (`NOTE: Pay close attention to the size, velocity & colour of the acorns.`, width / 2, 680); // Displays on screen text slighly lower then the procceding text.
  pop (); // Isolates code from using global properties.
}

function landingAnimation () { // Text animation on landing page.
  gameTitle.y = gameTitle.y + gameTitle.vy // Provides a vertical veleocty to the gameTitle text.
  gameTitle.y = constrain(gameTitle.y, 0, 300); // Constrains the title's y postion within the canvas.

  gameStart.x = gameStart.x + gameStart.vx // Provides a horizontal veleocty to the gameStart text.
  gameStart.x = constrain(gameStart.x, 0, 375); // Constrains the titles's x postion within the canvas.
}

function simulation () { // Main simulation state code.
  basketControl (); // Calls the basketControl function.
  brownAcornMovement (); // Calls the brownAcornMovement function.
  redAcornMovement (); // Calls the redAcornMovement function.
  goldAcornMovement (); // Calls the goldAcornMovement function.
  brownAcornScore (); // Calls the brownAcornScore function.
  redAcornScore (); // Calls the redAcornScore function.
  goldAcornScore (); // Calls the goldAcornScore function.
  display (); // Calls the display function, where the character images and background images are housed.
}

function winner () { // Main winner state code.
  push(); // Isolates code from using global properties.
  background (assetColour.black.r, assetColour.black.g, assetColour.black.b); // Displays the background colour as black.
  textSize (fontSize.large); // Displays the font size as 32px.
  fill (assetColour.yellow.r, assetColour.yellow.g, assetColour.yellow.b); // Makes the font yellow in colour.
  textFont (retroFont); // Changes the font from the default to a custom font.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  winnerText (); // Calls the winnerText function to display the text.
  translate (width / 2, height / 2); // Allows the text to rotate at the center of the screen
  rotate (radians(frameCount)); // Allows the text to rotate in relation to the 60FPS refresh rate.
  text (`Congratulations!`, 0,0); // // Displays on screen text the top left corner. It is then translated via the parameter above.
  pop (); // Isolates code from using global properties.
}

function winnerText () { // Text instructions for winner state.
  push (); // Isolates code from using global properties.
  textSize (fontSize.small); // Displays the font size as 32px.
  fill (assetColour.white.r, assetColour.white.g, assetColour.white.b); // Makes the font white in colour.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  textFont (retroFont); // Changes the font from the default to a custom font.
  text (`You've collected all the acorns. What will you do with them?`, width / 2, 650); // Displays on screen text near the bottom of the canvas.
  pop (); // Isolates code from using global properties.
}

function loser () { // Main loser state code.
  push (); // Isolates code from using global properties.
  background (assetColour.black.r, assetColour.black.g, assetColour.black.b); // Displays the background colour as black.
  textSize (fontSize.large); // Displays the font size as 100px.
  fill (assetColour.red.r, assetColour.red.g, assetColour.red.b); // Makes the font red in colour.
  textFont (retroFont); // Changes the font from the default to a custom font.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  text (`GAME OVER`, width / 2, height / 2); // Displays on screen text at the center of the canvas
  pop (); // Isolates code from using global properties.
}

function basketControl () { // Main code for basketControl
  basket.x = basket.x + basket.vx; // Provides basketControl with velocity to allow for horizontal movement.
  basket.x = constrain(basket.x, 0, 750); // Constrains basketControl's horizontal movement within the canvas.
  basket.vx = constrain(basket.vx, -basket.maxSpeed, basket.maxSpeed); // Constrains basketsControl's maxium speed.
  basket.vx = basket.vx + basket.ax; // Provides a horizontal acceleration to basketControl.
  basket.vx = basket.vx * basket.friction; // Provides a frictional aspect to basketControl.

  if (keyIsDown(RIGHT_ARROW)) { // Hold "right" arrow key to move the basket to the right
    basket.ax = 0.3; // Provides an accleration when translated to the right.
  }
  else if (keyIsDown(LEFT_ARROW)) { // Hold "left" arrow key to move the basket to the left
    basket.ax = -0.3; // Provides a deceleration when translated to the left.
  }
  else {
    basket.ax = 0; // Else, does not provide an acceleration.
  }
}

function brownAcornMovement () { // Main code for brownAcornMovement
brownAcorn.y = brownAcorn.y + brownAcorn.vy; // Provides a vertical velocity to the brownAcorn.

  if (brownAcorn.y > height) { // Says, apply the below code if the brownAcorn falls below the bottom of the canvas.
    brownAcorn.y = 0; // Positions the brownAcorn on the x-axis.
    brownAcorn.x = random(0, width); // Randomly selects the brownAcorn's Positions on the x-axis.
    brownAcorn.vy = random(brownAcorn.minSpeed, brownAcorn.maxSpeed); // Allows the brownAcorn to vertically travel at various velocities.
    brownAcorn.size = random(brownAcorn.minSize, brownAcorn.maxSize); // Allows the brownAcorn to vertically appear at various sizes.
  }
}

function redAcornMovement () { // Main code for redAcornMovement.
redAcorn.y = redAcorn.y + redAcorn.vy; // Provides a vertical velocity to the redAcorn.

  if (redAcorn.y > height) { // Says, apply the below code if the redAcorn falls below the bottom of the canvas.
    redAcorn.y = 0; // Positions the redAcorn on the x-axis.
    redAcorn.x = random(0, width); // Randomly selects the redAcorn's Positions on the x-axis.
    redAcorn.vy = random(redAcorn.minSpeed, redAcorn.maxSpeed); // Allows the redAcorn to vertically travel at various velocities.
    redAcorn.size = random(redAcorn.minSize, redAcorn.maxSize); // Allows the redAcorn to vertically appear at various sizes.
  }
}

function goldAcornMovement () { // Main code for goldAcornMovement.
goldAcorn.y = goldAcorn.y + goldAcorn.vy; // Provides a vertical velocity to the goldAcorn.

  if (goldAcorn.y > height) { // Says, apply the below code if the goldAcorn falls below the bottom of the canvas.
    goldAcorn.y = 0; // Positions the goldAcorn on the x-axis.
    goldAcorn.x = random(0, width); // Randomly selects the goldAcorn's Positions on the x-axis.
    goldAcorn.vy = random(goldAcorn.minSpeed, goldAcorn.maxSpeed); // Allows the goldAcorn to vertically travel at various velocities.
    goldAcorn.size = random(goldAcorn.minSize, goldAcorn.maxSize); // Allows the goldAcorn to vertically appear at various sizes.
  }
}

function brownAcornScore () {  // Checks to see if the brownAcorn is in the basket.
  let d = dist(basket.x, basket.y, brownAcorn.x, brownAcorn.y ); // Assigns a variable to the basket and brownAcorn in regards to distance.
  if (d < brownAcorn.size / 4 + basket.size / 4) { // Indicates the location of where the basket and brownAcorn will touch.
    score = score + 2; // Aigns a score of 2 for each time the basket and brownAcorn touch.
    if (!gameSound.acornSFX.isPlaying()) { // States that if the click sound effect is not playing, it will be played everytime the basket and brownAcorn touch.
      gameSound.acornSFX.play();
    }
  }
}

function redAcornScore () {  // Checks to see if the redAcorn is in the basket.
  let d = dist(basket.x, basket.y, redAcorn.x, redAcorn.y ); // Assigns a variable to the basket and redAcorn in regards to distance.
  if (d < redAcorn.size / 4 + basket.size / 4) { // Indicates the location of where the basket and redAcorn will touch.
    score = score + 4; // Aigns a score of 4 for each time the basket and redAcorn touch.
    if (!gameSound.acornSFX.isPlaying()) { // States that if the click sound effect is not playing, it will be played everytime the basket and redAcorn touch.
      gameSound.acornSFX.play();
    }
  }
}

function goldAcornScore () {  // Checks to see if the goldAcorn is in the basket.
  let d = dist(basket.x, basket.y, goldAcorn.x, goldAcorn.y ); // Assigns a variable to the basket and goldAcorn in regards to distance.
  if (d < goldAcorn.size / 4 + basket.size / 4) { // Indicates the location of where the basket and goldAcorn will touch.
    score = score + 6; // Aigns a score of 6 for each time the basket and goldAcorn touch.
    if (!gameSound.acornSFX.isPlaying()) { // States that if the click sound effect is not playing, it will be played everytime the basket and goldAcorn touch.
      gameSound.acornSFX.play();
    }
  }
}

function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
    if (!gameSound.simulationMusic.isPlaying()) { // States that once the "Enter" key is pushed, the simulation music will be played. (25 Seconds at it's longest form).
      gameSound.simulationMusic.play();
    }
  }
}

function gameTimer () { // Main code for dynamic game clock.
  push (); // Isolates code from using global properties.
  textSize (fontSize.medium); // Displays the font size as 64px.
  fill (0); // Makes the font white in colour.
  textFont (retroFont); // Changes the font from the default to a custom font.
  textAlign (CENTER, CENTER); // Dictates the text alignment style.
  text (`Time:`, 600, 50); // Displays text at the top right of the canvas.
  text (timer, 690, 50); // Displays dynamic timer result at the top right of the canvas.
  pop (); // Isolates code from using global properties.

  if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    timer --;
  }
  if (timer == 0) { // If the timer hits zero (0), then...
    state = `loser`; // Run the loser state.
    gameSound.loserMusic.play(); // Play loserMusic (10 seconds).
  }
}

function scoreBoard () { // Main code for dynamic score board.
  push (); // Isolates code from using global properties.
  fill (assetColour.black.r, assetColour.black.g, assetColour.black.b); // Makes the font black in colour.
  textSize (fontSize.medium); // Displays the font size as 64px.
  textFont (retroFont); // Changes the font from the default to a custom font.
  text (`Score:`, 50, 75); // Displays text at the top left of the canvas.
  text (score, 190, 75); // Displays dynamic score result at the top left of the canvas.
  pop (); // Isolates code from using global properties.

  if (score >= 500) { // If the score is equal to or greater then 500...
    state = `winner`; // Runs the winner state.
    gameSound.simulationMusic.stop(); // Stop the simulationMusic
    gameSound.winnerMusic.play(); // Play winnerMusic (5 Seconds).
  }
}

function display () { // Displays the on screen characters & images.
  imageMode (CENTER); // Indicates that the images are drawn from their center coordinates, rather the their top left coordinates.

  image (simulationGraphic.cloudScape, 0, 0); // Displays the "cloudScpae" image.
  image (simulationGraphic.brownAcorn, brownAcorn.x, brownAcorn.y, brownAcorn.size); // Displays the brownAcorn character.
  image (simulationGraphic.redAcorn, redAcorn.x, redAcorn.y, redAcorn.size); // Displays the redAcorn character.
  image (simulationGraphic.goldAcorn, goldAcorn.x, goldAcorn.y, goldAcorn.size); // Displays the goldAcorn character.
  image (simulationGraphic.treeTop, width / 2, 125); // Displays the "treeTop" image.
  image (simulationGraphic.basket, basket.x, basket.y, basket.size); // Displays the user's backet.

  gameTimer (); // Displays the gameTimer function.
  scoreBoard (); // Displays the scoreBoard function.
}
