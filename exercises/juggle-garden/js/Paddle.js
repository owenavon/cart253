class Paddle {

  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height / 2;
    this.ax = 0;
    this.ay = 0;
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.98;
    this.maxSpeed = 20;
  }

  move() {
    this.x = constrain(this.x, 0, width); // Constrains the paddle to the canvas width.

    this.x = this.x + this.vx; // Provides the paddle's with velocity to allow for horizontal movement.
    this.x = constrain(this.x, 0, width); // Constrains the paddle's horizontal movement within the canvas.
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed); // Constrains the paddle's movement maxium speed.
    this.vx = this.vx + this.ax; // Provides a horizontal acceleration to the paddle's movement.
    this.vx = this.vx * this.friction; // Provides a frictional aspect to the paddle's movement.

    if (keyIsDown(RIGHT_ARROW)) { // Hold "right" arrow key to move the paddle to the right
      this.ax = 0.3; // Provides an accleration when translated to the right.
    }
    else if (keyIsDown(LEFT_ARROW)) { // Hold "left" arrow key to move the paddle to the left
      this.ax = -0.3; // Provides a deceleration when translated to the left.
    }
    else {
      this.ax = 0; // Else, does not provide an acceleration.
    }
  }

  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
