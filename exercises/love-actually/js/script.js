
// Exercise 03: Love Actually
// Owen Avon

// The purpose of this exercise is to create a program with various states and experiment with knowledge that we have gained thus far.

//Plan
// - Make one of the circles controlled by the mouse in a reversed direction.
// - Apply the noise() function to the other circle to create a staggered movement effect.
// - Add a timer and connect a state to it, so that when the timer is up, the player wins the game.
// *- Add an "Easter Egg" state named "escape" which can be accessed when in the "simulation" state by pressing the "ESC" key.*
// - Change the circles to 8-bit characters, add 8-bit backgrounds and change the font to an appropriate theme style.

"use strict";

let link = {
  x: undefined,
  y: 600,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5
};

let zelda = {
  x: undefined,
  y: undefined,
  size: 100,
  minSize: 25,
  maxSize: 125,
  vx: 0,
  vy: 0,
  speed: 5,
  tx: 0,
  ty: 10,
  segmentSize: 100
};

let bgImages = {
  grass: undefined,
  space: undefined,
  escape: undefined,
  winner: undefined,
};

let characterImages = {
  x: 0,
  y: 0,
  size: 125,
  link: undefined,
  zelda: undefined
};

let fontSize = {
  small: 32,
  medium: 64,
  large: 100
};

let eightBitFont;
let timer = 15 // Sets the timer's value.
let state = `title`; // Can be: title, simulation, loser, winner, escape.

function preload() { // asynchronously loads files before the setup() function.
  bgImages.grass = loadImage("assets/images/grass.png"); // Preloads the "Grass" image.
  bgImages.space = loadImage("assets/images/space.gif"); // Preloads the "space" gif.
  bgImages.escape = loadImage("assets/images/escape.png"); // Preloads the "escape" image.
  bgImages.winner = loadImage("assets/images/winner.png"); // Preloads the "winner" image.
  characterImages.link = loadImage("assets/images/link.png"); // Preloads the "link" character image.
  characterImages.zelda = loadImage("assets/images/zelda.png"); // Preloads the "zelda" character image.

  eightBitFont = loadFont("assets/font/8-bit-pusab.ttf") // Preloads the custom downloaded font.
}

function setup () { // executes the lines of code contained inside its block.
  createCanvas (750, 750); // Sets the Canvas width and height.
  setupCharacters (); // Calls the setupCharacters() function.
}

function setupCharacters () { // Dictates the two characters.
  link.x = width / 3; // provides the static position of link.
  zelda.x = 2 * width / 3; // Provides the static position of zelda.
}

function draw() { // Location where code is excuted.
  if (state === `title`) { // Indicates that when the state equates to "title", start said state.
    title();
  }
  else if (state === `simulation` ) { // Indicates that when the state equates to "simulation", start said state.
    simulation ();
  }
  else if (state === `loser`) { // Indicates that when the state equates to "loser", start said state.
    loser ();
  }
  else if (state === `winner`) { // Indicates that when the state equates to "winner", start said state.
    winner ();
  }
  else if (state === `escape`) { // Indicates that when the state equates to "escae", start said state.
    escape ();
  }
}

function title () { // Location where code is excuted.
  push(); // Isolates code from using global properties.
  background(bgImages.space); // Calls the background image.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(200, 100, 100); // Makes the font salmon in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  textFont(eightBitFont); // Changes the font from the default to a custom font.
  text(`Can you avoid the enemy?`, width / 2, height / 2.75); // Displays on screen text at desired location.
  text(`Press "P" to play`, width / 2, height / 2); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function simulation () { // simulation state.
  background(bgImages.grass); // Calls the background image.
  linkControl(); // Calls indciated custom function.
  zeldaMovement(); // Calls indciated custom function.
  gameTimer(); // Calls indciated custom function.
  checkOverlap(); // Calls indciated custom function.
  display(); // Calls indciated custom function.
}

function loser () { // loser state.
  push(); // Isolates code from using global properties.
  background (0); // Sets the background to black in colour.
  textSize(fontSize.large); // Displays the font size as 100px.
  fill(255, 0, 0); // Makes the font red in colour.
  textFont(eightBitFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`GAME OVER`, keyCode, width / 2.6, height / 1.15); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function winner () { // winner state.
  push(); // Isolates code from using global properties.
  background(bgImages.winner); // Calls the background image.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textFont(eightBitFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`You've survived the enemy!`, keyCode, width / 2, height / 1.2); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function escape () { // escape state.
  push(); // Isolates code from using global properties.
  background(bgImages.escape); // Calls the background image.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255); // Makes the font white in colour.
  textFont(eightBitFont); // Changes the font from the default to a custom font.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`You've managed to flee`, keyCode, width / 5, height / 1.1); // Displays on screen text at desired location.
  pop(); // Isolates code from using global properties.
}

function linkControl () { // Allows link to move via the users mouse position.
  let dx = link.x - mouseX; // Defines x distance variable.
  let dy = link.y - mouseY; // Defines y distance variable.

  if (dx < 0) { // provides direction for left mouse movement.
    link.vx = -link.speed;
  }
  else if (dx > 0) { // provides direction for right mouse movement.
    link.vx = link.speed;
  }
  if (dy < 0) { // provides direction for upward mouse movement.
    link.vy = -link.speed;
  }
  else if (dy > 0) { // provides direction for downward mouse movement.
    link.vy = link.speed;
  }

  link.x = link.x + link.vx; // Allows link to move on the x-axis
  link.y = link.y + link.vy; // Allows link to move on the y-axis

  link.x = constrain(link.x, 0, 655); // Constrains link's x postion within the canvas.
  link.y = constrain(link.y, 0, 680); // Constrains link's y postion within the canvas.
}

function zeldaMovement () { // Allows zelda to move in regards to noise.
  zelda.x = map(noise(zelda.tx), 0, 1, 0, width); // Creates a staggered effect for Zelda's x postion.
  zelda.y = map(noise(zelda.ty), 0, 1, 0, height); // Creates a staggered effect for Zelda's y postion.

  zelda.tx = zelda.tx + 0.025; // States the time between the staggered direction change on the x-axis.
  zelda.ty = zelda.ty + 0.025; // States the time between the staggered direction change on the y-axis.

  let x = zelda.x; // Sets a local variable for zelda's x postion.
  let numSegments = 5; // Says I want 5 instances of zelda.

  for (let i = 0; i < numSegments; i++) { // Allows the for() loop to add additional instance(s).
    image(characterImages.zelda, x, zelda.y, zelda.segmentSize); // Indicates the variable that will be duplicated.
    x = x + 80; // Provides 80 px distance between each instance of zelda.
  }
}

function gameTimer () { // Creates a dynamic game clock.
  push(); // Isolates code from using global properties.
  fill(255); // Makes the font white in colour.
  textFont(eightBitFont); // Changes the font from the default to a custom font.
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

function checkOverlap () {  // Checks to see if Zelda and Link touch.
  let d = dist(link.x, link.y, zelda.x, zelda.y); // Assigns a variable to link and Zelda in regards to distance.
  if (d < link.size / 2 + zelda.size / 2) { // Indicates the location of where the two characters will touch.
    state = `loser`; // When the two characters touch, state will chnage to "loser".
  }
}

function display () { // Displays the on screen characters.
  image(characterImages.link, link.x, link.y, link.size); // Displays the link character.
  image(characterImages.zelda, zelda.x, zelda.y, zelda.size); // Displays the zelda character.
}

function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 80 && state === `title`) { // Says when the "P" key is pushed, and the state is in "title", switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
  else if (keyCode === 27 && state === `simulation`) { // Says when the "ESC" key is pushed, and the state is in "simulation", switch to the "escape" state.
    state = `escape`; // Runs the "escape" state.
  }
}
