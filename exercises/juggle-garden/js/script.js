  // A7: Object-Oriented Programming activity
  // Owen Avon

  // Experimenting with Object-Oriented Programming

  "use strict";

  let gravityForce = 0.0025; // Assigns a numerical value to the variable gravityForce.
  let paddle; // defines paddle as a variable.

  let balls = []; // Creates an array named balls.
  let numBalls = 10; // Provides a dynamic number of instances inside the array.

  let spawnBalls = []; // Creates an array named spawnBalls.
  let numEmergencyBalls = 1; // Provides a dynamic number of instances inside the array.

  let tokens = []; // Creates an array named tokens.
  let numTokens = 5; // Provides a dynamic number of instances inside the array.

  let clickSFX = undefined; // Sets clickSFX as a variable.
  let bouncyFont; // Defines custom font.
  let state = `landing`; // Provides the starting state. Can be "landing", "simulation", "winner", "loser".

  let gameTitle = { // Creates custom object for main heading.
    string: `Bouncing Balls`,
    x: 375,
    y: 300,
  }

  let gameStart = { // Creates custom object for secondary heading.
    string: `Press "Enter" to play`,
    x: 375,
    y: 375,
  }

  let fontSize = { // Creates custom object for various font sizes.
    small: 36,
    medium: 64,
    large: 96
  };

let bgColour = { // Creates custom object for various background colours.
    landing: {
      r: 100,
      g: 100,
      b: 100
    },
    winner: {
      r: 0,
      g: 100,
      b: 0,
    },
    loser: {
      r: 100,
      g: 0,
      b: 0,
    }
  };

  function preload() { // P5 function that loads assets in prior to starting the simulation.
    clickSFX = loadSound (`./assets/sounds/click.mp3`); // Preloads the "click" for efficient load times.
    bouncyFont = loadFont ("assets/font/playfulWorld.ttf") // Preloads the custom downloaded font for efficient load times.
  }

  // Description of setup()
  function setup() {
    createCanvas(750, 750);
    generatePaddle(); // Function that is called to generate the paddle.
    generateToken(); // Function that is called to generate the token.
    mousePressed(); // p5 function that is called to allow for mouse input, but is later specified  to only function in the simulation state.
    spawnInitialBalls(); // Function that is called to generate the first emergency ball.
  }

  function generatePaddle() { // Function called in setup.
    paddle = new Paddle(300, 20); // Calls class and sets paddles height and width statically.
  }

  function generateToken() { // Function called in setup.
    for (let i = 0; i < numTokens; i++) { // Create our Tokens by counting up to the number of the Tokens.
      let horizontal = random(0, width); // Set a random x position.
      let vertical = random(100, 650); // set a random y postion.
      let tokenSize = random(25, 50); // set a random size.
      let centreColor = { // Provide a colour to the inside of the token.
        r: 255,
        g: 153,
        b: 51
      };
      let outerColor = { // Provide a colour to the outside of the token.
        r: 255,
        g: 255,
        b: 0
      };
      let token = new Token(horizontal, vertical, tokenSize, centreColor, outerColor); // Calls class and sets parameters
      tokens.push(token); // Adds the token to the array of tokens.
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
    background(bgColour.landing.r, bgColour.landing.g, bgColour.landing.b); // Displays the background colour as dark blue.
    textSize(fontSize.medium); // Displays the font size as 56px.
    fill(215); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    textFont (bouncyFont); // Changes the font from the default to a custom font.
    text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
    text(gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
    landingInstructions(); // Calls the landingInstructions function to display text with different formatting.
    pop(); // Isolates code from using global properties.
  }

  function landingInstructions() { // Text instructions for landing state.
    push(); // Isolates code from using global properties.
    textSize(fontSize.small); // Displays the font size as 36px.
    fill(30); // Displays the instructions in grey colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    textFont (bouncyFont); // Changes the font from the default to a custom font.
    text(`NOTE: Left click to add emergency ball.`, width / 2, 600); // Displays on screen text slighly lower then the title text.
    text(`OBJECTIVE: Collect all the tokens by overlapping the ball.`, width / 2, 640); // Displays on screen text slighly lower then the title text.
    text(`CONTROLS: Use the left and right arrow keys to navigate the trampoline.`, width / 2, 680); // Displays on screen near the bottom of the canvas.
    pop(); // Isolates code from using global properties.
  }

  function simulation() { // simulation state.
    background(50); // Calls the background image.
    updatePaddle(); // // Function that calls the paddles move and display properties.
    updateToken(); // Function that calls the number of token's Forloop.
    updateBall(); // Function that calls the number of ball's Forloop.
  }

  function winner() { // Main winner state code.
    push(); // Isolates code from using global properties.
    background(bgColour.winner.r, bgColour.winner.g, bgColour.winner.b); // Displays the background colour.
    textSize(fontSize.large); // Displays the font size as 96px.
    fill(255); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    winnerSubtext(); // Calls the winnerSubtext function to display text with different formatting.
    textFont (bouncyFont); // Changes the font from the default to a custom font.
    text(`Congratulations`, width / 2, height / 2); // Displays on screen text at the center of the canvas.
    pop(); // Isolates code from using global properties.
  }

  function winnerSubtext() { // Sub text instructions for winner state.
    push(); // Isolates code from using global properties.
    background(bgColour.winner.r, bgColour.winner.g, bgColour.winner.b); // Displays the background colour.
    textSize(fontSize.small); // Displays the font size as 36px.
    fill(0, 200, 0); // Makes the font greenin colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    textFont (bouncyFont); // Changes the font from the default to a custom font.
    text(`You've collected all the tokens! Be proud.`, width / 2, height / 1.5); // Displays on screen text below the main title.
    pop(); // Isolates code from using global properties.
  }

  function loser() { // Main loser state code.
    push(); // Isolates code from using global properties.
    background(bgColour.loser.r, bgColour.loser.g, bgColour.loser.b); // Displays the background colour as dark blue.
    textSize(fontSize.large); // Displays the font size as 96px.
    fill(255); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    loserSubtext(); // Calls the loserSubtext function to display text with different formatting.
    textFont (bouncyFont); // Changes the font from the default to a custom font.
    text(`GAME OVER`, width / 2, height / 2); // Displays on screen text at the center of the canvas.
    pop(); // Isolates code from using global properties.
  }

  function loserSubtext() { // Sub text instructions for loser state.
    push(); // Isolates code from using global properties.
    background(bgColour.loser.r, bgColour.loser.g, bgColour.loser.b); // Displays the background colour as dark blue.
    textSize(fontSize.small); // Displays the font size as 36px.
    fill(255, 0, 0); // Makes the font red in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    textFont (bouncyFont); // Changes the font from the default to a custom font.
    text(`You didn't read the objective... did you?`, width / 2, height / 1.5); // Displays on screen text below the main title.
    pop(); // Isolates code from using global properties.
  }

  function updatePaddle() { // Calls the function in Simulation
    paddle.move(); // links to move class in Paddle.js
    paddle.display(); // links to display class in Paddle.js
  }

  function updateToken() { // Function that is called in simulation
    let numActiveTokens = 0; // A variable to count how many active tokens we find this frame
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i]; // Sets token variable to an Infinite  amount in the array.
      if (token.view) { // Says, if the tokens are visble, do the following...
        numActiveTokens++; // Since this is active, add one to our count.
        token.display(); // links to the dispay class in Token.js
      }
    }
    if (numActiveTokens === 0) { // If we counted zero (0) active token, then change state to winner.
     state = `winner`; // Swaps to winner state.
    }
  }

  function spawnInitialBalls() { // Function that is called in setup to generate balls
    balls = []; // Set an array for "balls"
    for (let i = 0; i < numBalls; i++) { // Store the current ball in a variable
      let x = random(0, width); // Let the x position be anywhere on the canvas
      let y = random(-400, -100); // Let the y position be anywhere on the canvas
      let ball = new Ball(x, y, clickSFX); // Calls class and sets parameters
      balls.push(ball); // Allows ball to generate dpedning on the amount set in numBalls
    }
  }

  function updateBall() { // Function that is called in simulation
   let numActiveBalls = 0; // A variable to count how many active balls we find this frame
   for (let i = 0; i < balls.length; i++) { // Store the current ball in a variable
     let ball = balls[i]; // sets the ball variable to the balls array.
     if (ball.view) { // Says, if the ball is visble, do the following...
       numActiveBalls++; // Since this is active, add one to our count
       ball.gravity(gravityForce); // Apply gravity, move, bounce, and display. Called in Ball.js
       ball.move(); // Apply move. Called in Ball.js
       ball.bounce(paddle); // Apply bounce. Called in Ball.js
       ball.display(); // Apply display. Called in Ball.js

       for (let j = 0; j < tokens.length; j++) {
         let token = tokens[j]; // Sets the token variable to the tokens array.
         if (token.view) { // Says, if the tokens are visble, do the following...
           ball.tryToTouchToken(token) // runs function to check overlap. Called in Token.js
         }
       }
     }
   }
   if (numActiveBalls === 0) { // If we counted zero (0) active balls, then change state to loser.
     state = `loser`; // Swaps to loser state.
   }
 }

  function mousePressed () { // Generate emergency ball, and is called in setup.
    if (state === 'simulation') { // Says only apply the below if in simulation state.
      let x = mouseX; // Makes the mouse capable of clicking on a x postion.
      let y = mouseY; // Males the mouse capable of clicking on a y postion.

      for (let i = balls.length; i < numBalls + numEmergencyBalls ; i++) { // spawn only the balls that do not yet exist in the array until the array length reach the number of balls desired by the sum of balls + numEmergencyBalls.
        let ball = new Ball(x, y, clickSFX) // Calls class and sets parameters.
        balls.push(ball); // Allows ball to generate dpedning on the amount set in numEmergencyBalls.
      }
    }
  }

  function keyPressed () { // p5 function to perform action with keyboard input.
    if (keyCode === 13 && state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
      spawnInitialBalls(); // Runs the intial ball function.
      state = `simulation`; // Runs the "simulation" state.
    }
  }
