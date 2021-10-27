
// A7: Object-Oriented Programming activity
// Owen Avon

// Experimenting with Object-Oriented Programming

"use strict";


let gravityForce = 0.0025;
let paddle;

let balls = [];
let numBalls = 10;

let tokens = [];
let numTokens = 10;

// Description of setup()
function setup() {
  createCanvas(750, 750);

  paddle = new Paddle(300, 20);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);

    let ball = new Ball(x, y);
    balls.push(ball);
  }

  for (let i = 0; i < numTokens; i++) { // Create our Tokens by counting up to the number of the Tokens
    let horizontal = random(0, width);
    let vertical = random(0, height);
    let tokenSize = random(50, 80);
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
  background(0);

  paddle.move();
  paddle.display();

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
      token.display();
  }
}
