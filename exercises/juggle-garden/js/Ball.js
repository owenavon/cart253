class Ball {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 50;
    this.view = true;
  }

  gravity(force) {
    this.ay = this.ay + force;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.x = constrain(this.x, 0, width); // Constrains the ball to the canvas width

    if (this.y - this.size / 2 > height) {
      this.view = false;
    }
  }

  bounce(paddle) {
    if (this.x > paddle.x - paddle.width / 2 && // Within the paddle's width.
        this.x < paddle.x + paddle.width / 2 &&
        this.y + this.size / 2 > paddle.y - paddle.height / 2 &&
        this.y - this.size / 2 < paddle.y + paddle.height / 2) {

      // Bounce
      let dx = this.x - paddle.x;
      this.vx = this.vx + map(dx, -paddle.width / 2, paddle.width / 2, -2, 2); // Additonal left and right velocity for bouncing ball.

      this.vy = -this.vy;
      this.ay = 0;
    }
  }

  tryToTouchToken(token) {
    let d = dist(this.x, this.y, token.x, token.y);
    if (d < this.size / 2 + token.size / 2) {
      token.disappear();
    }
  }

  // stopGame() {
  //   if (this.numBalls < 0) {
  //     state = `loser`;
  //   }
  // }
















  display() {
    push();
    fill(255, 50, 50);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
