
class AudioCar {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 100;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.fill = 255;
    this.alive = true;
  }

  checkHit(pothole) { // Checks whether the audioCar's centre-point overlaps a pothole
    if (this.x > pothole.x - pothole.width/2 &&
        this.x < pothole.x + pothole.width/2 &&
        this.y > pothole.y - pothole.height/2 &&
        this.y < pothole.y + pothole.height/2) {

      this.alive = false; // If there's an overlap then the simulaton goes to "loser" state
    }
  }

  handleInput() { // Uses microphone input to trasnalate audio car up the y axis.

    this.y = this.y + this.vy; // Provides the paddle's with velocity to allow for horizontal movement.
    this.y = constrain(this.y, 0, width); // Constrains the paddle's horizontal movement within the canvas.

    if (keyIsDown(UP_ARROW)) { // Hold "right" arrow key to move the paddle to the right.
      this.vy = -1; // Provides an accleration when translated to the right.
    }
    else if (keyIsDown(DOWN_ARROW)) { // Hold "left" arrow key to move the paddle to the left.
      this.vy = 1; // Provides a deceleration when translated to the left.
    }

    let micLevel = mic.getLevel(); // Get microphone volume
    console.log(micLevel);

    let step = map(micLevel, 0, 1, 0, 10); // Create variable that maps the car location to the microphone input
    this.y = this.y - step; // Add's car y postion eachtime their is microphone input
  }

  move() { // Add velocity to position for movement
    this.x = this.x + this.vx; // Horizontaly Move the car (N/A)
    this.y = this.y + this.vy; // Vertically Move the car
  }

  display() { // Displays the audioCar as a circle
    push(); // Isolates code from using global properties.
    fill(this.fill); // Makes the car white in colour
    noStroke(); // Removes ellipse stroke
    ellipse(this.x,this.y,this.size); // Displays the cars x position, y position and size as an ellipse
    pop(); // Isolates code from using global properties.
  }
}
