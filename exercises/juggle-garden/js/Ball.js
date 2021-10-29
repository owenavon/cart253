class Ball { // Creates a class that is called from script.js

  constructor(x, y, clickSFX) { // function that creates an instance of a class.
    this.x = x; // defines the x postion in spawnInitialBalls function.
    this.y = y; // defines the y postion in spawnInitialBalls function.
    this.vx = 0; // Assigns an intial horiozontal velocity to 0.
    this.vy = 0; // Assigns an intial vertical velocity to 0.
    this.ax = 0; // Assigns an intial horiozontal accleration to 0.
    this.ay = 0; // Assigns an intial vertical accleration to 0.
    this.maxSpeed = 10; // Assigns maxSpeed a value so the ball does not become arbitrarily fast
    this.size = 50; // Assigns a ball size.
    this.ballColor = { // Assigns an RGB value to the ball.
      r: 50,
      g: 200,
      b: 250
    };
    this.clickSFX = clickSFX; // defines the sound effect in spawnInitialBalls function.
    this.view = true; // Creates a boolean value to say that the variable is being "viewed" upon starting the simulation.
  }

  gravity(force) { // Function which is called in updateBall();
    this.ay = this.ay + force; // Provides a force on vertical accleration.
  }

  move() { // Function which is called in updateBall();
    this.vx = this.vx + this.ax; // Provides a horiozontal acceleration based off of the horizontal velocity.
    this.vy = this.vy + this.ay; // Provides a vertical acceleration based off of the vertical velocity.

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed); // Limits the ball's horiozontal velocity.
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed); // Limits the ball's vertical velocity.

    this.x = this.x + this.vx; // Provides a horizontal velocity based off of the ball's X postion.
    this.y = this.y + this.vy; // Provides a vertical velocity based off of the ball's Y postion.

    this.x = constrain(this.x, 0, width); // Constrains the ball to the canvas width.

    if (this.y - this.size / 2 > height) { // States that if the ball goes below the canvas, then...
      this.view = false; // Stop drawing the ball. This keeps the program lighter and thus more efficent.
    }
  }

  bounce(paddle) { // Function that dictates the result when the ball touches the paddle.
    if (this.x > paddle.x - paddle.width / 2 && // States that the ball is within the width of the paddle.
        this.x < paddle.x + paddle.width / 2 && // States that the ball is within the width of the paddle.
        this.y + this.size / 2 > paddle.y - paddle.height / 2 && // States that the ball is within the height of the paddle.
        this.y - this.size / 2 < paddle.y + paddle.height / 2) { // States that the ball is within the height of the paddle.

      let dx = this.x - paddle.x; // Provides a bounce to the ball when it touches the paddle.
      this.vx = this.vx + map(dx, -paddle.width / 2, paddle.width / 2, -2, 2); // Additonal left and right velocity for when ball hits specific location of paddle.

      this.vy = -this.vy; // Prevents the ball from further accelerating after each bounce.
      this.ay = 0; // Provides the ball with a consistent acceleration after each bounce.

      if (!this.clickSFX.isPlaying()) { // States that if the click sound effect is not playing, it will be played everytime a ball touches the paddle
        this.clickSFX.play();
      }
    }
  }

  tryToTouchToken(token) { // Function which is called in updateToken();
    let d = dist(this.x, this.y, token.x, token.y); // // Assigns a variable to the ball and token in regards to distance.
    if (d < this.size / 2 + token.size / 2) { // Indiactes where the ball and token will overlap.
      token.disappear(); // Dictates that if the ball and token overlap, the token will start to disappear.
    }
  }

  display() { // Function which is called in updateBall();
    push(); // Isolates code from using global properties.
    fill(this.ballColor.r, this.ballColor.g, this.ballColor.b); // Provides a light blue colour to the balls.
    noStroke(); // Removes stroke from ball.
    ellipse(this.x, this.y, this.size); // Creates the circle shape.
    pop(); // Isolates code from using global properties.
  }
}
