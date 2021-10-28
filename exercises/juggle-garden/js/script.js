  // A7: Object-Oriented Programming activity
  // Owen Avon

  // Experimenting with Object-Oriented Programming

  "use strict";

  let gravityForce = 0.0025;
  let paddle;

  let balls = [];
  let numBalls = 10;

  let tokens = [];
  let numTokens = 1;

  let clickSFX = undefined;

  let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".

  let gameTitle = {
    string: `Trampoline Token`,
    x: 375,
    y: 300,
  }

  let gameStart = {
    string: `Press "Enter" to play`,
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

  function preload() {
    clickSFX = loadSound (`./assets/sounds/click.mp3`); // Preloads the "click" for efficient load times.
  }

  // Description of setup()
  function setup() {
    createCanvas(750, 750);

    paddle = new Paddle(300, 20);

    for (let i = 0; i < numBalls; i++) {
      let x = random(0, width);
      let y = random(-400, -100);
      let ball = new Ball(x, y, clickSFX);
      balls.push(ball);
    }

    for (let i = 0; i < numTokens; i++) { // Create our Tokens by counting up to the number of the Tokens
      let horizontal = random(0, width);
      let vertical = random(100, 650);
      let tokenSize = random(25, 50);
      let centreColor = {
        r: 255,
        g: 153,
        b: 51
      };
      let outerColor = {
        r: 255,
        g: 255,
        b: 0
      };
      let token = new Token(horizontal, vertical, tokenSize, centreColor, outerColor); // used to call constructor
      tokens.push(token); // Adds the token to the array of tokens
    }
  }

  // Description of draw()
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
    text(`NOTE: Click to add emergency ball`, width / 2, 600); // Displays on screen text slighly lower then the title text.
    text(`OBJECTIVE: Collect all of the tokens by touching the ball`, width / 2, 640); // Displays on screen text slighly lower then the title text.
    text(`CONTROLS: Use the left and right arrow keys to navigate the trampoline.`, width / 2, 680); // Displays on screen near the bottom of the canvas.
    pop(); // Isolates code from using global properties.
  }

  function simulation() { // simulation state.
    background(0); // Calls the background image.
    generatePaddle(); // // Function that calls the paddles move and display properties.
    generateToken(); // Function that calls the number of token's Forloop.
    generateBall(); // Function that calls the number of ball's Forloop.
    // gameTimer(); // Displays the gameTimer function.
    // scoreBoard(); // Displays the scoreBoard function.
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
    text(`You got all the tokens! Be proud.`, width / 2, height / 1.5); // Displays on screen text below the main title.
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
    text(`To difficult for you?`, width / 2, height / 1.5); // Displays on screen text below the main title.
    pop(); // Isolates code from using global properties.
  }

  function generatePaddle() {
    paddle.move();
    paddle.display();
  }

  function generateToken() {
    let numActiveTokens = 0; // A variable to count how many active tokens we find this frame
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (token.view) {
        numActiveTokens++; // Since this is active, add one to our count
        token.display();
      }
    }
    if (numActiveTokens === 0) { // If we counted zero (0) active balls, then change state to loser.
     state = `winner`;
    }
  }

  function generateBall() {
    let numActiveBalls = 0; // A variable to count how many active balls we find this frame
    for (let i = 0; i < balls.length; i++) { // Store the current ball in a variable
      let ball = balls[i]; // Store the current ball in a variable
      if (ball.view) {
        numActiveBalls++; // Since this is active, add one to our count
        ball.gravity(gravityForce); // Apply gravity, move, bounce, and display
        ball.move(); // Apply move
        ball.bounce(paddle); // Apply bounce
        ball.display(); // Apply display

    for (let j = 0; j < tokens.length; j++) {
      let token = tokens[j];
      if (token.view) {
        ball.tryToTouchToken(token)
        }
      }
    }
  }
  if (numActiveBalls === 0) { // If we counted zero (0) active balls, then change state to loser.
    state = `loser`;
  }
}

function mousePressed () { // Emergency Ball
  let x = mouseX;
  let y = mouseY;
  let ball = new Ball(x, y, clickSFX);
  balls.push(ball);
}

function keyPressed () { // p5 function to perform action with keyboard input.
  if (keyCode === 13 && state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
    state = `simulation`; // Runs the "simulation" state.
  }
}
