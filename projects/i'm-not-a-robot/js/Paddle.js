class Paddle { // Creates a class that is called from script.js

  constructor(w, h) { // function that creates an instance of a class.
    this.width = w; // Defines the width in generatePaddle function.
    this.height = h; // Defines the heightin generatePaddle function.
    this.x = 0; // Tells the program to display the paddle on the left side of the canvas.
    this.y = height - this.height / 2; // Tells the program to dispay the paddle at the bottom of the canvas, minius it's height.
    this.ax = 0; // Assigns an intial horiozontal accleration to 0.
    this.ay = 0; // Assigns an intial vertical accleration to 0.
    this.vx = 0; // Assigns an intial horiozontal velocity to 0.
    this.vy = 0; // Assigns an intial vertical velocity to 0.
    this.friction = 0.98; // Provides a friction value
    this.maxSpeed = 20; // Limits the paddle's speed from becoming arbitrarily fast.
  }

  move() { // Function which is called in updatePaddle();
    this.x = constrain(this.x, 0, width); // Constrains the paddle to the canvas width.

    this.x = this.x + this.vx; // Provides the paddle's with velocity to allow for horizontal movement.
    this.x = constrain(this.x, 0, width); // Constrains the paddle's horizontal movement within the canvas.
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed); // Constrains the paddle's movement maxium speed.
    this.vx = this.vx + this.ax; // Provides a horizontal acceleration to the paddle's movement.
    this.vx = this.vx * this.friction; // Provides a frictional aspect to the paddle's movement.

    if (keyIsDown(RIGHT_ARROW)) { // Hold "right" arrow key to move the paddle to the right.
      this.ax = 0.3; // Provides an accleration when translated to the right.
    }
    else if (keyIsDown(LEFT_ARROW)) { // Hold "left" arrow key to move the paddle to the left.
      this.ax = -0.3; // Provides a deceleration when translated to the left.
    }
    else {
      this.ax = 0; // Else, does not provide an acceleration.
    }
  }

  display() { // Function which is called in updatePaddle();
    push(); // Isolates code from using global properties.
    fill(255); // Makes the paddle white in colour.
    noStroke(); // Remove stroke from paddle.
    rectMode(CENTER); // Draws rectangles from thier centre.
    rect(this.x, this.y, this.width, this.height); // Creates rectangle shape.
    pop(); // Isolates code from using global properties.
  }
}
