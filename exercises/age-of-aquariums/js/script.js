// Exercise 04: The Age of Aquariums
// Owen Avon

// The purpose of this exercise is to create a program with loops and arrays.

// Plan:
// Create 4 states: landing, simulation, winner looser, so that the program progresses along.
// Create an ellipse (Later create shark image) that is controlled by mouseX and mouseY.
// Create a scoreboard and timer to add an objective to the game, as well as to trigger various sates
// Create an array for the seaweed. The seaweed will allow the fish to enter for "safety", but prevent the shark from entering.

"use strict";

let school = []; // Creates an array.
let schoolSize = 25; // sets the amount of dynamic "items" in the array.

let safety = []; // Creates an array.
let seaweedGroup = 3; // sets the amount of dynamic "items" in the array.

let shark = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  speed: 2,
  maxSpeed: 4,
  acceleration: 0.1,
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

let bgColour = {
  teal: {
    r: 112,
    g: 128,
    b: 144
  },
  darkBlue: {
    r: 0,
    g: 0,
    b: 50,
  }
};

let bgImage = {
  water: undefined,
  fish: undefined,
  shark: undefined,
  seaweed: undefined,
};

let score = 0; // Starts the score board at "0".
let timer = 25; // Sets the timer's value.
let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".

function preload() {
  bgImage.water = loadImage("assets/images/water.png"); // Preloads the "Water" image.
  bgImage.fish = loadImage("assets/images/fish.png"); // Preloads the "Fish" image.
  bgImage.shark = loadImage("assets/images/shark.png"); // Preloads the "Shark" image.
  bgImage.seaweed = loadImage("assets/images/seaweed.png"); // Preloads the "Seaweed" image.
}

function setup() {
  createCanvas(750, 750); // Sets the Canvas width and height.
  setupFish(); // Calls the setupFish() function.
  setupSeaweed(); // Calls the setupFish() function.
}

function setupFish() { // Function that loops the fish image.
  for (let i = 0; i < schoolSize; i++) { // Sets the array postion to i and allows increments.
    let fish = createFish(random(0, width), random(0, height)); // Postion the fish at random x and y coordinates.
    school.push(fish); // Essentially tells the loop to function and continue to add instances to meet the indicated dsired amount.
  }
}

function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
    eaten: false
  }
  return fish; // Specifies the value of fish to be returned by the function.
}

function setupSeaweed() { // Function that loops the seaweed image.
  for (let i = 0; i < seaweedGroup; i++) { // Sets the array postion to i and allows increments
    let seaweed = createSafety(random(100, width), random(100, height)); // Postion the seaweed at random x and y coordinates. "100" value prevents the seaweed from blocking the shark upon simulation startup.
    safety.push(seaweed); // Essentially tells the loop to function and continue to add instances to meet the indicated dsired amount.
  }
}

function createSafety(x, y) {
  let seaweed = {
    x: x,
    y: y,
    size: 200,
  }
  return seaweed; // Specifies the value of seaweed to be returned by the function.
}

function draw() {
  if (state === `landing`) { // Indicates that when the state equates to "landing", start said state.
    landing();
  } else if (state === `simulation`) { // Indicates that when the state equates to "simulation", start said state.
    simulation();
  } else if (state === `winner`) { // Indicates that when the state equates to "winner", start said state.
    winner();
  } else if (state === `loser`) { // Indicates that when the state equates to "loser", start said state.
    loser();
  }
}

function landing() { // Main landing state code.
  push(); // Isolates code from using global properties.
  background(bgColour.darkBlue.r, bgColour.darkBlue.g, bgColour.darkBlue.b); // Displays the background colour as dark blue.
  textSize(fontSize.medium); // Displays the font size as 56px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
  text(gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
  landingInstructions(); // Calls the landingInstructions function to display text with different formatting.
  pop(); // Isolates code from using global properties.
}

function landingInstructions() { // Text instructions for landing state.
  push(); // Isolates code from using global properties.
  textSize(fontSize.small); // Displays the font size as 28px.
  fill(bgColour.teal.r, bgColour.teal.g, bgColour.teal.b); // Displays the instructions in teel colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`NOTE: Pay close attention to the seaweed.`, width / 2, 600); // Displays on screen text slighly lower then the title text.
  text(`OBJECTIVE: Eat 20 fish within 25 seconds.`, width / 2, 640); // Displays on screen text slighly lower then the title text.
  text(`CONTROLS: Use your mouse to navigate the shark.`, width / 2, 680); // Displays on screen near the bottom of the canvas.
  pop(); // Isolates code from using global properties.
}

function simulation() { // simulation state.
  background(bgImage.water); // Calls the background image.
  generateSeaweed(); // // Calls a function that houses all functions related to the "seaweed".
  generateShark(); // Calls a function that houses all functions related to the "shark".
  generateFish(); // Calls a function that houses all functions related to the "fish".
  gameTimer(); // Displays the gameTimer function.
  scoreBoard(); // Displays the scoreBoard function.
}

function winner() { // Main winner state code.
  push(); // Isolates code from using global properties.
  background(bgColour.darkBlue.r, bgColour.darkBlue.g, bgColour.darkBlue.b); // Displays the background colour as dark blue.
  textSize(fontSize.large); // Displays the font size as 84px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  winnerSubtext(); // Calls the winnerSubtext function to display text with different formatting.
  text(`Congratulations`, width / 2, height / 2); // Displays on screen text at the center of the canvas.
  pop(); // Isolates code from using global properties.
}

function winnerSubtext() { // Sub text instructions for winner state.
  push(); // Isolates code from using global properties.
  background(bgColour.darkBlue.r, bgColour.darkBlue.g, bgColour.darkBlue.b); // Displays the background colour as dark blue.
  textSize(fontSize.small); // Displays the font size as 28px.
  fill(255, 255, 0); // Makes the font yellow in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`The shark is delighted with it's dinner!`, width / 2, height / 1.5); // Displays on screen text below the main title.
  pop(); // Isolates code from using global properties.
}

function loser() { // Main loser state code.
  push(); // Isolates code from using global properties.
  background(0, 0, 50); // Displays the background colour as dark blue.
  textSize(fontSize.large); // Displays the font size as 84px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  loserSubtext(); // Calls the loserSubtext function to display text with different formatting.
  text(`GAME OVER`, width / 2, height / 2); // Displays on screen text at the center of the canvas.
  pop(); // Isolates code from using global properties.
}

function loserSubtext() { // Sub text instructions for loser state.
  push(); // Isolates code from using global properties.
  background(0, 0, 50); // Displays the background colour as dark blue.
  textSize(fontSize.small); // Displays the font size as 32px.
  fill(255, 0, 0); // Makes the font red in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`The poor shark is still hungry!`, width / 2, height / 1.5); // Displays on screen text below the main title.
  pop(); // Isolates code from using global properties.
}

function generateShark() { // Groups Shark related functions together.
  controlShark(); // Calls the controlShark function.
  displayShark(); // Calls the displayShark function.
}

function controlShark() { // Main code to navigate shark.
  let dx = shark.x - mouseX; // Defines x distance variable.
  let dy = shark.y - mouseY; // Defines y distance variable.

  if (dx < 0) { // provides direction for left mouse movement.
    shark.ax = shark.acceleration; // Provides an acceleration when translated to the left.
  } else { // provides direction for right mouse movement.
    shark.ax = -shark.acceleration; // Provides an acceleration when translated to the right.
  }
  if (dy < 0) { // provides direction for upward mouse movement.
    shark.ay = shark.acceleration; // Provides an acceleration when translated upwards.
  } else { // provides direction for downward mouse movement.
    shark.ay = -shark.acceleration; // Provides an acceleration when translated downwards.
  }

  shark.x = shark.x + shark.vx; // Provides shark with velocity to allow for horizontal movement.
  shark.y = shark.y + shark.vy; // Provides shark with velocity to allow for vertical movement.

  shark.vx = shark.vx + shark.ax; // Provides a horizontal acceleration to basketControl.
  shark.vx = constrain(shark.vx, -shark.maxSpeed, shark.maxSpeed); // Constrains basketsControl's maxium speed.
  shark.vy = shark.vy + shark.ay; // Provides a horizontal acceleration to basketControl.
  shark.vy = constrain(shark.vy, -shark.maxSpeed, shark.maxSpeed); // Constrains basketsControl's maxium speed.

  shark.x = constrain(shark.x, 0, width); // Constrains shark to the canvas width.
  shark.y = constrain(shark.y, 0, height); // Constrains shark to the canvas height.
}

function displayShark() { // Displays the shark.
  push(); // Isolates code from using global properties.
  imageMode(CENTER); // Indicates that the images are drawn from their center coordinates, rather the their top left coordinates.
  image(bgImage.shark, shark.x, shark.y, shark.size) // Displays the "shark" image.
  pop(); // Isolates code from using global properties.
}

function checkShark(seaweed) { // Checks to see if the shark has hit the seweed, and become stuck.
  let d = dist(shark.x, shark.y, seaweed.x, seaweed.y); // Assigns a variable to the shark and seaweed in regards to distance.
  if (d < shark.size / 2 + seaweed.size / 2) { // Indicates the location of where the shark and seaweed will touch.
    shark.x = shark.x + -1; // Stops the shark from enetering the seaweed.
  }
}

function generateFish() { // Groups fish related functions together.
  for (let i = 0; i < school.length; i++) { // Forloop that asigns the array to "i" and teels it to increase the amount of fish to match the indicated amount in schoolSize.
    moveFish(school[i]); // Calls function within the array.
    displayFish(school[i]); // Calls function within the array.
    checkFish(school[i]); // Calls function within the array.
  }
}

function moveFish(fish) { // Function that is called within the array.
  let change = random(0, 1); // Postion the fish at random x and y coordinates.
  if (change < 0.1) { // 10% chance that the fish change direction.
    fish.vx = random(-fish.speed, fish.speed); // Allow the fish's x velocity to vary (0.1 - 2).
    fish.vy = random(-fish.speed, fish.speed); // Allow the fish's y velocity to vary (0.1 - 2).
  }

  fish.x = fish.x + fish.vx; // Provides fish with velocity to allow for horizontal movement.
  fish.y = fish.y + fish.vy; // Provides fish with velocity to allow for vertical movement.

  fish.x = constrain(fish.x, 0, width); // Constrains fish to the canvas width.
  fish.y = constrain(fish.y, 0, height); // Constrains fish to the canvas height.
}

function displayFish(fish) { // Function that is called within the array.
  if (!fish.eaten) { // Says "if the fish are not eaten", do the following...
    push(); // Isolates code from using global properties.
    imageMode(CENTER); // Indicates that the images are drawn from their center coordinates, rather the their top left coordinates.
    image(bgImage.fish, fish.x, fish.y, fish.size) // Displays the "fish" image.
    pop(); // Isolates code from using global properties.
  }
}

function checkFish(fish) { // Function that id called withn the array that checks the fish score.
  if (!fish.eaten) { // Says "if the fish are not eaten", do the following...
    let d = dist(shark.x, shark.y, fish.x, fish.y); // Assigns a variable to the shark and fish in regards to distance.
    if (d < shark.size / 2 + fish.size / 2) { // Indicates the location of where the shark will eat the fish.
      fish.eaten = true; // returns boolean value of true to indicate that the fish is eaten.
      score = score + 1; // Aigns a score of 1 for each time the shark eats a fish.
    }
  }
}

function generateSeaweed(seaweed) { // Groups Seaweed related functions together.
  for (let i = 0; i < safety.length; i++) { // Forloop that asigns the array to "i" and tells it to increase the amount of seaweed to match the indicated amount in seaweedGroup.
    displaySafety(safety[i]); // Calls function within the array.
    checkSafety(safety[i]); // Calls function within the array.
  }
}

function displaySafety(seaweed) { // Function that is called within the array.
  push(); // Isolates code from using global properties.
  imageMode(CENTER); // Indicates that the images are drawn from their center coordinates, rather the their top left coordinates.
  image(bgImage.seaweed, seaweed.x, seaweed.y, seaweed.size) // Displays the "seaweed" image.
  pop(); // Isolates code from using global properties.
}

function checkSafety(seaweed) { // Function that is called within the array.
  let d = dist(shark.x, shark.y, seaweed.x, seaweed.y); // Assigns a variable to the shark and seaweed in regards to distance.
  if (d < shark.size / 2.5 + seaweed.size / 2.5) { // Indicates the location of where the shark will be stoped by the seaweed.

    shark.x = shark.x + -shark.vx; // Provides shark with velocity to allow for horizontal movement.
    shark.y = shark.y + -shark.vy; // Provides shark with velocity to allow for vertical movement.

    shark.vx = shark.vx + shark.ax - 0.01; // Provides a horizontal acceleration to shark control.
    shark.vy = shark.vy + shark.ay - 0.01; // Provides a vertical acceleration to shark control.
  }
}

function gameTimer() { // Main code for dynamic game clock.
  push(); // Isolates code from using global properties.
  textSize(fontSize.medium); // Displays the font size as 64px.
  fill(255); // Makes the font white in colour.
  textAlign(CENTER, CENTER); // Dictates the text alignment style.
  text(`Time:`, 565, 50); // Displays text at the top right of the canvas.
  text(timer, 690, 50); // Displays dynamic timer result at the top right of the canvas.
  pop(); // Isolates code from using global properties.

  if (frameCount % 60 == 0 && timer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
    timer--;
  }
  if (timer == 0) { // If the timer hits zero (0), then...
    state = `loser`; // Run the loser state.
  }
}

function scoreBoard() { // Main code for dynamic score board.
  push(); // Isolates code from using global properties.
  fill(255); // Makes the font black in colour.
  textSize(fontSize.medium); // Displays the font size as 56px.
  text(`Score:`, 50, 67); // Displays text at the top left of the canvas.
  text(score, 250, 67); // Displays dynamic score result at the top left of the canvas.
  pop(); // Isolates code from using global properties.
  if (score >= 20) { // If the score is equal to or greater then 20...
    state = `winner`; // Runs the winner state.
  }
}

function mousePressed() { // p5 function to perform action with mouse click.
  if (state === `landing`) { // Indicates that if the mouse is clicked in the "landing" state, switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
}
