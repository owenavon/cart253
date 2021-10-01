
// 2021 Pac-Man
// Owen Avon

// This program is inspired by PacMan. This striped down version shows comprehension of variables and conditionals.

// Idea / Plan
// Replace the circle from "04-dodging-covid-19" with Pac-Man figures and reconfigure gameplay.
// 1) Learn and apply "keyIsDown" function to white circle.
// 2) Duplicate red circle and change their starting coordinates.
// 3) Replace the circles with images.
// 4) Slightly modify the background. However, I find the static quite fitting for this program.
// 5) Apply additional random attributes to the circles (monsters) behaviour and create a "Game Over" screen when the monsters collide with Pac-Man.

"use strict";

  let blueMonster = {
    x: 0,
    y: 0,
    minSize: 50,
    maxSize: 250,
    size: 100,
    vx: 0,
    vy: 0,
    growth: 0.3,
    minSpeed: 5,
    maxSpeed: 10,
    speed: 5,
  };

  let greenMonster = {
    x: 0,
    y: 0,
    minSize: 50,
    maxSize: 250,
    size: 100,
    vx: 0,
    vy: 0,
    minSpeed: 5,
    maxSpeed: 10,
    speed: 5,
  };

  let pacMan = {
    x: 800,
    y: 400,
    size: 100,
    speed: 7,
  };

  let staticBg = {
    numStatic: 500,
    strokeWeight: 2,
    stroke: {
      r: 255,
      g: 255,
      b: 0
    }
  };

  let pacManImage = {
    x: 0,
    y: 250,
    size: 100,
    image: undefined
  };

  let greenMonsterImage = {
    x: 0,
    y: 250,
    size: 100,
    image: undefined
  };

  let blueMonsterImage = {
    x: 0,
    y: 250,
    size: 100,
    image: undefined
  };

  let gameOverImage = {
    x: 700,
    y: 300,
    size: 500,
    image: undefined
  };

  // preload() is used to asynchronously load files before the setup() function.
  function preload() {
    gameOverImage.image = loadImage("assets/images/gameOver.png"); // Preloads the "Game Over" image.
    pacManImage.image = loadImage("assets/images/pacMan.png"); // Preloads the Pac-Man image.
    blueMonsterImage.image = loadImage("assets/images/blueMonster.png"); // Preloads the Blue Monster image.
    greenMonsterImage.image = loadImage("assets/images/greenMonster.png"); // Preloads the Green Monster image.
  }

  // setup() executes the lines of code contained inside its block.
  function setup() {
    createCanvas(windowWidth, windowHeight); // Sets Canvas width and height as responsive.

    blueMonster.y = random(0, height); // Indicates that the Blue Monster will appear at a random y postion.
    blueMonster.vx = blueMonster.speed; // Sets the Blue Monster's velocity.

    greenMonster.x = random(0, width); // Indicates that the Green Monster will appear at a random x postion.
    greenMonster.vy = greenMonster.speed; // Sets the Green Monster's velocity.
  }

  // draw() Location where code is excuted.
  function draw() {
    background(0); // Sets the background colour to black.

  // Display static background
  for (let i = 0; i < staticBg.numStatic; i++) { // makes a single point increase every frame.
    let x = random(0, width); // Sets a random point postion.
    let y = random(0, height); // Sets a random point postion.
    strokeWeight(staticBg.strokeWeight); // Indicates the point's size / weight.
    stroke(staticBg.stroke.r, staticBg.stroke.g, staticBg.stroke.b); // Sets the points colour to yellow.
    point(x, y); // Indicates that the points will be dsiplayed at random Coordinates.
  }

  // Blue Monster Movement.
  blueMonster.x = blueMonster.x + blueMonster.vx; // Allows the Blue Monster to move horizontally.

  if (blueMonster.x > width) {
    blueMonster.x = 0; // Starts the blue monster from the left side of the screen.
    blueMonster.y = random(0, height); // Randomly selects the Blue Monsters vertical starting postion.
    blueMonster.vx = random(blueMonster.minSpeed, blueMonster.maxSpeed); // Allows the Blue Monster to travel at various velocities.
    blueMonster.size = random(blueMonster.minSize, blueMonster.maxSize); // Allows the Blue Monster to appear at various sizes.
  }
  else {
    blueMonster.size = blueMonster.size + blueMonster.growth; // Indicates that the Blue Monster will increase in size as it translates.
  }

  // Green Monster Movement
  greenMonster.y = greenMonster.y + greenMonster.vy; // Allows the green monster to move vertically.

  if (greenMonster.y > height) {
    greenMonster.x = random(0, width);// Randomly selects the Green Monster's horizontal starting postion.
    greenMonster.y = 0; // Starts the Green Monster from the top of the screen.
    greenMonster.vy = random(greenMonster.minSpeed, greenMonster.maxSpeed); // Allows the Green Monster to travel at various velocities.
    greenMonster.size = random(greenMonster.minSize, greenMonster.maxSize); // Allows the Green Monster to appear at various sizes.
  }
  else {
  }

  // Movement of Pac-Man via the keyboard.
  if (keyIsDown(LEFT_ARROW)) {
      pacMan.x = pacMan.x - pacMan.speed; // Hold "left" arrow key to move Pac-Man to the left
    }
    if (keyIsDown(RIGHT_ARROW)) {
      pacMan.x = pacMan.x + pacMan.speed; // Hold "right" arrow key to move Pac-Man to the right
    }
    if (keyIsDown(UP_ARROW)) {
      pacMan.y = pacMan.y - pacMan.speed; // Hold "up" arrow key to move Pac-Man upwards.
    }
    if (keyIsDown(DOWN_ARROW)) {
      pacMan.y = pacMan.y + pacMan.speed; // Hold "down" arrow key to move Pac-Man downwards.
    }

  // Process which occurs when the Blue Monster collides with Pac-Man.
  let dblueMonster = dist(pacMan.x, pacMan.y, blueMonster.x, blueMonster.y); // Sets the distance between the Blue monster and Pac-Man.
  if (dblueMonster < blueMonster.size / 2 + pacMan.size / 2) { // Explains that the Blue Monster and Pac-Man will touch.
    image(gameOverImage.image, gameOverImage.x, gameOverImage.y, gameOverImage.size); // Displays a "Game Over" screen when Pac-Man and the Blue Monster collide.
    noLoop(); // When Pac-Man and the Blue Monster touch, this Stops the program from continuously executing the code.
    }

  // Process which occurs when the Green Monster collides with Pac-Man.
  let dgreenMonster = dist(pacMan.x, pacMan.y, greenMonster.x, greenMonster.y); // // Sets the distance between the Green monster and Pac-Man.
  if (dgreenMonster < greenMonster.size / 2 + pacMan.size / 2) { // Explains that the Green Monster and Pac-Man will touch.
    image(gameOverImage.image, gameOverImage.x, gameOverImage.y, gameOverImage.size); // Displays a "Game Over" screen when Pac-Man and the Green Monster collide.
    noLoop(); // When Pac-Man and the Green Monster touch, this Stops the program from continuously executing the code.
    }

  // Displays Blue Monster.
  image(blueMonsterImage.image, blueMonster.x, blueMonster.y, blueMonster.size, blueMonster.size);

  // Displays Green Monster.
  image(greenMonsterImage.image, greenMonster.x, greenMonster.y, greenMonster.size, greenMonster.size);

  // Displays Pac-Man.
  image(pacManImage.image, pacMan.x, pacMan.y, pacMan.size, pacMan.size);

}
