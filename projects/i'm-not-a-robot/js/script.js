  // Project 2 - i'm not a robot
  // Owen Avon

  // The objective of this program is for the user to prove that they are not a robot, and in fact an human behind the screen. These question will include slecting the correct answer, interacting in various mini games, etc. all wihtin a specified time.

  // See "README" for a detailed"game plan".

  "use strict";

  let state = `falseStart`; // Starting state of program

  let letters = "";
  let riddleText;

  let video; // User's webcam
  let modelName = `CocoSsd`; // The name of our model
  let cocossd; // ObjectDetector object (using the name of the model for clarify)
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

  let audioCar;
  let potholes = [];

  let addPotholeInterval = 1 * 75; // How often to add a new vehicle (in frames). One every second The timer that will count down to 0 so we'll know when to add a new vehicle
  let audioPuzzletimer = addPotholeInterval;

  let startInstructionVisible = false;
  let startLandingVisible = false;
  let startLandingTimer = 0;

  let mic;
  let autoTimer = 5; // Sets the timer's value.

  let textFade;
  let textFadeAmount = 1;

  let synth; // Our synthesizer
  let notes = [   `F1`, `G1`, `Ab2`, `Bb2`, `C2`, `Dd2`, `Eb2`,
                  `F2`, `G2`, `Ab3`, `Bb3`, `C3`, `Dd3`, `Eb3`,
                  `F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Dd4`, `Eb4`,
                  `F4`, `G4`, `Ab5`, `Bb5`, `C5`, `Dd5`, `Eb5`,
                  `F5`, `G5`, `Ab6`, `Bb6`, `C6`, `Dd6`, `Eb6`,
                  `F6`, `G6`, `Ab7`, `Bb7`, `C7`, `Dd7`, `Eb7`,]; // The scale for F minor ("b" means "flat" if you haven't seen it before)
  let currentNote = 0; // The current note to play, start at the beginning
  let interval; // To track the interval that plays note

  let gameFalseStart = {
    string: `I'm not a Robot`,
    x: 375,
    y: 300,
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
    y: 335,
  }

  let gameTitle = { // Creates custom object for main heading.
    string: `I'm not a Robot`,
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
    string: `CONTROLS: Vary depending on puzzles. Follow on screen instruction.`,
    x: 375,
    y: 635,
  }

  let gameNote = { // Creates custom object for secondary heading.
    string: `NOTE: Allow the web broswer to access audio & video inputs for the full experience.`,
    x: 375,
    y: 670,
  }

  let audioPuzzleHeading = { // Creates custom object for secondary heading.
    string: `Navigate the car up the road with your voice. (Or up arrow key...)`,
    x: 375,
    y: 100,
  }

  let audioPuzzleSubHeading = { // Creates custom object for secondary heading.
    string: `The louder you talk, the faster the car moves. Avoid potholes at all costs.`,
    x: 375,
    y: 135,
  }

  let ballPuzzleHeading = { // Creates custom object for secondary heading.
    string: `Splendid! Now you must successfully collect all the tokens.`,
    x: 375,
    y: 100,
  }

  let ballPuzzleSubHeading = { // Creates custom object for secondary heading.
    string: `The catch! Complete this task within 6 repetitions of the F Minor scale`,
    x: 375,
    y: 135,
  }

  let ballPuzzleTertiaryHeading = { // Creates custom object for secondary heading.
    string: `Collect the tokens by bouncing the balls into them. A mouse click might help...`,
    x: 375,
    y: 170,
  }

  let cameraRiddleHeading = { // Creates custom object for primary heading.
    string: `Very good. Solve the riddle... A mouse press might help?`,
    x: 375,
    y: 93.75,
  }

  let cameraRiddleSubHeading = { // Creates custom object for secondary heading.
    string: `Type the answer in lowercase letters, followed by "ENTER"`,
    x: 375,
    y: 600,
  }

  let cameraRiddleAnswerHeading = { // Creates custom object for tertiary heading.
    string: `Answer:`,
    x: 300,
    y: 652,
  }

  let cameraLoadingHeading = { // Creates custom object for secondary heading.
    string: `Hmm, you're starting to appear as human... One more test.`,
    x: 375,
    y: 100,
  }

  let finalCheckHeading = { // Creates custom object for Primary heading.
    string: `Wow, maybe you actually are human?`,
    x: 375,
    y: 100,
  }

  let finalCheckSubHeading = { // Creates custom object for Primary heading.
    string: `Lets try this again...`,
    x: 375,
    y: 135,
  }

  let finalStartButtonText = {
    string: `I'm not a Robot`,
    x: 375,
    y: 300,
  }

  let gameSuccess = {
    string: `You're not a Robot`,
    x: 375,
    y: 375,
  }

  let gameFail = {
    string: `You must re-start the simulation for security reasons.`,
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
    vSmall: 12,
    small: 18,
    medium: 64,
    large: 82
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

  let finalStartButton = {
    x: undefined,
    y: undefined,
    size: 100,
    fill: 255,
    highLightFill: 128,
    normalFill: 255,
    disappear: false
  };

  let flashCamera = {
    x: 375,
    y: 375,
    size: 1,
    fill: 255,
  };


  // PRELOAD
  function preload() { // P5 function that loads assets in prior to starting the simulation.
    clickSFX = loadSound (`./assets/sounds/click.mp3`); // Preloads the "click" for efficient load times.
    congratsSFX = loadSound (`./assets/sounds/congrats.mp3`); // Preloads the "congarts" for efficient load times.
    riddleText = loadStrings('./assets/text/riddle.txt'); // Preloads the "riddle" txt file efficient load times.
  }


  // SETUP
  function setup () { // Executes the lines of code contained inside its block.
    createCanvas (750, 750); // Sets the Canvas width and height.
    generateRobotButton();
    generateFinalRobotButton();
    generateAudioInput();
    delayVirus();
    generateAudioCar();

    generatePaddle(); // Function that is called to generate the paddle.
    generateToken(); // Function that is called to generate the token.
    mousePressed();
    spawnInitialBalls(); // Function that is called to generate the first emergency ball.

    generateTextFade();
    generatePolySynth();
  }

  function delayVirus () {
    setTimeout(showInstruction, 3000);
  }

  function showInstruction () {
    startInstructionVisible = true;
  }

  function generateRobotButton() {
    startButton.x = width / 2;
    startButton.y = height / 1.75;
  }

  function generateFinalRobotButton() {
    finalStartButton.x = width / 2;
    finalStartButton.y = height / 1.75;
  }

  function generateAudioInput() {
      mic = new p5.AudioIn();
      mic.start();
  }

  function generateAudioCar() {
    let x = width / 2;
    let y = height;
    audioCar = new AudioCar(x, y);
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

  function generateTextFade() {
    textFade = 0;
  }

  function generatePolySynth() {
    userStartAudio();
    synth = new p5.PolySynth(); // Create the synthesizer
  }


  // Draw
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
      cameraRiddle ();
    }
    else if (state === `cameraFlash`) {
      cameraFlash ();
    }
    else if (state === `cameraLoad`) {
      cameraLoad ();
    }
    else if (state === `cameraPuzzle`) {
      cameraPuzzle ();
    }
    else if (state === `finalCheck`) {
      finalCheck ();
    }
    else if (state === `winner`) {
      winner ();
    }
    else if (state === `loser`) {
      loser ();
    }
  }


  // falseStart STATE
  function falseStart() { // Main landing state code.
    background(0); // Displays the background colour as black.

    displayFalseStartText();
    startButtonHighLight();
    startButtonOverlap();
    displayStartButton();
  }

  function displayFalseStartText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.medium); // Displays the font size as 32px.
    fill(255); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    text(gameFalseStart.string, gameFalseStart.x, gameFalseStart.y); // Displays the title of the game.
    pop(); // Isolates code from using global properties.
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

  // error STATE
  function error() { // Main landing state code.
    background(0); // Displays the background colour as black.
    displayErrorText();

    virus();
    errorWaitTime();
  }

  function displayErrorText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.medium); // Displays the font size as 32px.
    fill(255, 0, 0); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    noStroke();
    text(gameError.string, gameError.x, gameError.y); // Displays the title of the game.
    cursor(ARROW);
    pop();
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


  // instructions STATE
  function instructions () { // Main landing state code.
    background(0); // Displays the background colour as black.
    displayInstructionsText();

    instructionsWaitTime();
  }

  function displayInstructionsText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.small); // Displays the font size as 32px.
    fill(255); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    noStroke();
    text(gameIntroTextLine1.string, gameIntroTextLine1.x, gameIntroTextLine1.y); // Displays the title of the game.
    text(gameIntroTextLine2.string, gameIntroTextLine2.x, gameIntroTextLine2.y); // Displays the text that dictates what the user must press to start the game.
    pop(); // Isolates code from using global properties.
  }


  // landing STATE
  function landing () { // Main landing state code.
    background(0); // Displays the background colour as black.
    displayLandingHeadingText();
    displayLandingText();
  }

  function instructionsWaitTime() { // Main code for dynamic game clock.
    startLandingTimer +=1;
    if (startLandingTimer >= 300) {
      state = `landing`;
    }
  }

  function displayLandingHeadingText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.medium); // Displays the font size as 32px.
    fill(0, 255, 0); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    noStroke();
    text(gameTitle.string, gameTitle.x, gameTitle.y); // Displays the title of the game.
    pop(); // Isolates code from using global properties.
  }

  function displayLandingText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.small); // Displays the font size as 32px.
    fill(255); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    noStroke();
    text(gameStart.string, gameStart.x, gameStart.y); // Displays the text that dictates what the user must press to start the game.
    text(gameObjective.string, gameObjective.x, gameObjective.y); // Displays the text that dictates what the user must press to start the game.
    text(gameControl.string, gameControl.x, gameControl.y); // Displays the text that dictates what the user must press to start the game.
    text(gameNote.string, gameNote.x, gameNote.y); // Displays the text that dictates what the user must press to start the game.
    pop(); // Isolates code from using global properties.
  }


  // audioPuzzle STATE
  function audioPuzzle() { // Main landing state code.
    background(125); // Displays the background colour as black.

    displayAudioPuzzleText();
    audioCarResources();
    audioPotholeTimer();
    audioPotholeStates();
  }

  function displayAudioPuzzleText() {
    push();
    textSize(fontSize.small); // Displays the font size as 32px.
    fill(0); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    noStroke();
    text(audioPuzzleHeading.string, audioPuzzleHeading.x, audioPuzzleHeading.y);
    text(audioPuzzleSubHeading.string, audioPuzzleSubHeading.x, audioPuzzleSubHeading.y);
    pop();
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
  function ballPuzzle() { // Main landing state code.
    background(50); // Displays the background colour as black.
    displayBallPuzzleText();

    updatePaddle(); // // Function that calls the paddles move and display properties.
    updateToken(); // Function that calls the number of token's Forloop.
    updateBall(); // Function that calls the number of ball's Forloop.
  }

  function displayBallPuzzleText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.small); // Displays the font size as 32px.
    fill(255); // Makes the font white in colour.
    noStroke();
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    text(ballPuzzleHeading.string, ballPuzzleHeading.x, ballPuzzleHeading.y); // Displays the heading text.
    text(ballPuzzleSubHeading.string, ballPuzzleSubHeading.x, ballPuzzleSubHeading.y); // Displays the secondary text.
    text(ballPuzzleTertiaryHeading.string, ballPuzzleTertiaryHeading.x, ballPuzzleTertiaryHeading.y); // Displays the tertiary heading
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
     clearInterval(interval); // Clear the interval and set interval
     interval = undefined; // Back to undefined to stop synth.
     state = `cameraRiddle`; // Swaps to cameraLoad state.
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
       clearInterval(interval); // Clear the interval and set interval
       interval = undefined; // Back to undefined to stop synth.
       state = `loser`; // Swaps to loser state.
    }
  }

  function playNextNote() { // playNextNote() plays the next note in our array
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





  // cameraRiddle STATE
  function cameraRiddle() {
    background(100);
    displayCameraText();
    displayRiddleText();
    displayAnswerField();
  }

  function displayCameraText() {
    push();
    fill(255); // Make font black in colour.
    textSize(fontSize.small); // Displays the font size as 18px.
    textAlign(CENTER, CENTER);
    text(cameraRiddleHeading.string, cameraRiddleHeading.x, cameraRiddleHeading.y);
    text(cameraRiddleSubHeading.string, cameraRiddleSubHeading.x, cameraRiddleSubHeading.y);
    text(cameraRiddleAnswerHeading.string, cameraRiddleAnswerHeading.x, cameraRiddleAnswerHeading.y);

    rectMode(CENTER);
    noStroke();
    rect(410, 660, 150, 1);
    pop();
  }

  function displayRiddleText() {
    textSize(fontSize.small);
    noStroke();
    textAlign(LEFT, TOP);

    for (let i = 0; i < riddleText.length; i++) { // Array for text
      let words = riddleText[i].split(" ");
      let currentOffset = 0;

      for (let j = 0; j < riddleText.length; j++) { // Array for visible blocks
        let wordWidth = textWidth(words[j]);
        fill(0); // Makes blocks black in color
        rect(275 + currentOffset, 275 + i * 25, wordWidth, 20);

        if (mouseIsPressed) {
          fill(255); // Makes text white in colour
          text(words[j], 275 + currentOffset, 275 + i * 25);
        }

        currentOffset += wordWidth + 4; // four pixels between words
      }
    }

  }

  function displayAnswerField() {
    text(letters, width / 2, height / 1.17);
  }


  // cameraFlash STATE
  function cameraFlash() {
    push();
    background(0);
    noStroke();
    fill(flashCamera.fill);
    rectMode (CENTER);
    ellipse(flashCamera.x, flashCamera.y, flashCamera.size);
    pop();

    quickFlash();
  }

  function quickFlash () {
    flashCamera.size = flashCamera.size + 100;
    if(flashCamera.size > 750)
      state = `cameraLoad`;
  }


  // cameraLoad STATE
  function cameraLoad() {
    background(255);
    displayLoadingText();
    webcamDetection();
  }

  function displayLoadingText() { // Displays the webcam. If there are currently objects detected it outlines them and labels them with the name and confidence value.
    push();
    fill(0); // Make font black in colour.
    textSize(fontSize.small); // Displays the font size as 18px.
    textAlign(CENTER, CENTER);
    text(cameraLoadingHeading.string, cameraLoadingHeading.x, cameraLoadingHeading.y); // Displays the title of the game.
    text(`Loading ${modelName}...`, width / 2, height / 2);
    pop();
  }

  function webcamDetection() {
    // Start webcam and hide the resulting HTML element
    video = createCapture(VIDEO); // Start the CocoSsd model and when it's ready start detection
    video.hide(); // and switch to the running state

      cocossd = ml5.objectDetector('cocossd', {}, function() { // Ask CocoSsd to start detecting objects, calls gotResults if it finds something
      cocossd.detect(video, gotResults);
      state = `cameraPuzzle`; // Switch to the cameraPuzzle state
    });
  }

  function gotResults(err, results) { // Called when CocoSsd has detected at least one object in the video feed
    if (err) {   // If there's an error, report it
      console.error(err);
    }
    else { // Otherwise, save the results into our predictions array
      predictions = results;
    }
    cocossd.detect(video, gotResults); // Ask CocoSsd to detect objects again so it's continuous
  }


  // cameraPuzzle STATE
  function cameraPuzzle() {
    image(video, 0, 0, width, 600); // Display the webcam

    if (predictions) { // Check if there currently predictions to display
      for (let i = 0; i < predictions.length; i++) { // If so run through the array of predictions
        // Get the object predicted
        let object = predictions[i];
        if (object.label === `person` && object.confidence > 0.93) {
          state = `finalCheck`;
        }
        else {
          highlightObject(object); // Highlight it on the canvas
        }
      }
    }
  }

  function highlightObject(object) { // Provided with a detected object it draws a box around it and includes its label and confidence value
    push();
    noFill();
    stroke(255, 255, 0);
    rect(object.x, object.y, object.width, object.height); // Display a box around it
    pop();

    push();
    textSize(fontSize.small); // Displays the font size as 18px.
    fill(255, 255, 0);
    textAlign(CENTER, CENTER);
    text(`${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);   // Display the label and confidence in the center of the box
    pop();
  }


  // finalCheck STATE
  function finalCheck() { // Main landing state code.
    background(0); // Displays the background colour as black.

    finalFadeTextCheck();
    finalDisplayFalseStartText();
    finalStartButtonHighLight();
    finalStartButtonOverlap();
    finalDisplayStartButton();
  }

  function finalFadeTextCheck() {
    push();
    textSize(fontSize.small); // Displays the font size as 32px.
    fill(255, textFade)
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    text(finalCheckHeading.string, finalCheckHeading.x, finalCheckHeading.y);
    text(finalCheckSubHeading.string, finalCheckSubHeading.x, finalCheckSubHeading.y);
    pop();

    if (textFade < 0) textFadeAmount = 5; {
      textFade = textFade + textFadeAmount;
    }
  }

  function finalDisplayFalseStartText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.medium); // Displays the font size as 32px.
    fill(255); // Makes the font white in colour.
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    text(finalStartButtonText.string, finalStartButtonText.x, finalStartButtonText.y); // Displays the title of the game.
    pop(); // Isolates code from using global properties.
  }

  function finalStartButtonHighLight() { // Highlight function for start button.
    let d = dist(mouseX, mouseY, finalStartButton.x, finalStartButton.y);
    if (d < finalStartButton.size / 2) {
      finalStartButton.fill = finalStartButton.highLightFill;
      cursor(HAND);
    }
    else {
      finalStartButton.fill = finalStartButton.normalFill;
      cursor(ARROW);
    }
  }

  function finalStartButtonOverlap() {
    let d = dist(mouseX, mouseY, finalStartButton.x, finalStartButton.y);
    if (d < finalStartButton.size / 2) {
      return true;
    }
    else {
      return false;
    }
  }

  function finalDisplayStartButton() {
    if (!finalStartButton.disappear) {
    push();
    noStroke();
    fill(finalStartButton.fill);
    rectMode (CENTER);
    rect(finalStartButton.x, finalStartButton.y, finalStartButton.size);
    pop();
    }
  }

  // winner STATE
  function winner() { // Main landing state code.
    background(0); // Displays the background colour as black.
    winnerText();
    jingleDelay();
  }

  function winnerText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.large); // Displays the font size as 82px.
    fill(0, 255, 0); // Makes the red white in colour.
    noStroke();
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    text(gameSuccess.string, gameSuccess.x, gameSuccess.y); // Displays the title of the game.
    pop(); // Isolates code from using global properties.
  }


  function jingleDelay() { // Main code for dynamic game clock.
    if (frameCount % 1 == 0 && autoTimer > 0) { // Indicates that if the frameCount is divisible by 60, then a second has passed.
      autoTimer --;
    }
    if (autoTimer == 0 && state === `winner` ) { // If the timer hits zero (0), then...
      if (!congratsSFX.isPlaying()) { // States that if the click sound effect is not playing, it will be played everytime a ball touches the paddle
        congratsSFX.play();

      }
    }
  }


  // loser STATE
  function loser() { // Main landing state code.
    background(0); // Displays the background colour as black.
    loserText();
  }

  function loserText() {
    push(); // Isolates code from using global properties.
    textSize(fontSize.small); // Displays the font size as 18px.
    fill(255, 0, 0); // Makes the red white in colour.
    noStroke();
    textAlign(CENTER, CENTER); // Dictates the text alignment style.
    text(gameFail.string, gameFail.x, gameFail.y); // Displays the title of the game.
    pop(); // Isolates code from using global properties.
  }


  // MOUSE PRESS FUNCTION
  function mousePressed() {
    // FALSE START CODE
    if (state === `falseStart`) {
      let d = dist(mouseX, mouseY, startButton.x, startButton.y);
      if (d < startButton.size / 2) {
        startButton.disappear = true;
        state = `error`;
      }
    }

    // FINAL CHECK CODE
    if (state === `finalCheck`) {
      let d = dist(mouseX, mouseY, finalStartButton.x, finalStartButton.y);
      if (d < finalStartButton.size / 2) {
        finalStartButton.disappear = true;
        state = `winner`;
      }
    }

    // ADDTIONAL BALL CODE
    if (state === 'ballPuzzle') { // Says only apply the below if in simulation state.
      let x = mouseX; // Makes the mouse capable of clicking on a x postion.
      let y = mouseY; // Males the mouse capable of clicking on a y postion.

      for (let i = balls.length; i < numBalls + numEmergencyBalls ; i++) { // spawn only the balls that do not yet exist in the array until the array length reach the number of balls desired by the sum of balls + numEmergencyBalls.
        let ball = new Ball(x, y, clickSFX) // Calls class and sets parameters.
        balls.push(ball); // Allows ball to generate dpedning on the amount set in numEmergencyBalls.
      }
    }

    // POLYSYNTH START AND STOP CODE
    if (interval === undefined) { // First check that the piano isn't already playing. The interval will be undefined if it hasn't started
      interval = setInterval(playNextNote, 500); // Start our interval, calling playRandomNote every 500 milliseconds. Assign the result to interval to remember the interval
    }
  }


  // KEYTYPED FUNCTION
  function keyTyped() {
    if (state === `cameraRiddle`) {
      letters = letters + key;
    }
  }


  // KEYPRESSED FUNCTION
  function keyPressed () { // p5 function to perform action with keyboard input.
    if (keyCode === 13 && state === `landing`) { // Says when the "Enter" key is pushed, and the state is in "landing", switch to the "simulation" state.
      state = `audioPuzzle`; // Runs the "simulation" state.
    }

    if (state === `cameraRiddle`) {
      if (keyCode === BACKSPACE) {
        letters = letters.slice(0, letters.length - 1); // This is a way to remove the last character in a string!
      }
      else if (letters === `webcam`) {
        state = `cameraFlash`; // Swaps to cameraFlash STATE
      }
    }

  }
