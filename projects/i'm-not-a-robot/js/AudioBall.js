
class AudioBall {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.2;
    this.fill = 255;
    this.alive = true;
  }

  checkHit(obstacle) { // Checks whether the audioCar's centre-point overlaps a obstacle
    if (this.x > obstacle.x - obstacle.width / 0.6 &&
        this.x < obstacle.x + obstacle.width / 0.6 &&
        this.y > obstacle.y - obstacle.height / 0.6 &&
        this.y < obstacle.y + obstacle.height / 0.6) {

      this.alive = false; // If there's an overlap then the simulaton goes to "loser" state
    }
  }

  handleInput() { // Uses microphone input to translate audio car up the y axis.

    this.y = this.y + this.vy; // Provides the car with velocity to allow for vertical movement.
    this.y = constrain(this.y, 0, width); // Constrains the car's horizontal movement within the canvas.

    let micLevel = mic.getLevel(); // Get microphone volume
    console.log(micLevel); // Displays input value in console for validation.

    let step = map(micLevel, 0, 0.3, 0, 10); // Create variable that maps the car location to the microphone input
    this.y = this.y - step; // Add's car y postion eachtime their is microphone input

    // UNCOMMENT BELLOW ARROW KEY CONTROLS IF MICROPHONE INPUT DOES NOT WORK.

    if (keyIsDown(UP_ARROW)) { // Hold "up" arrow key to move the ball upwards.
      this.vy = -1; // Decreases y velocity to move upwards
    }

    if (keyIsDown(RIGHT_ARROW)) { // Hold "right" arrow key to move the ball to the right
      this.vx = 1; // Increases x velocity to move to the right
    }
    else if (keyIsDown(LEFT_ARROW)) { // Hold "left" arrow key to move the ball to the left
      this.vx = -1; // Decreases x velocity to move to the left
    }

  }

  move() { // Add velocity to position for movement
    this.x = this.x + this.vx; // Horizontaly Move the car (N/A)
    this.y = this.y + this.vy; // Vertically Move the car

    this.vy = this.gravity; // Sets the audioCar's downward velocity (force).
  }

  display() { // Displays the audioCar as a circle
    push(); // Isolates code from using global properties.
    fill(this.fill); // Makes the car white in colour
    noStroke(); // Removes ellipse stroke
    ellipse(this.x,this.y,this.size); // Displays the cars x position, y position and size as an ellipse
    pop(); // Isolates code from using global properties.
  }
}
