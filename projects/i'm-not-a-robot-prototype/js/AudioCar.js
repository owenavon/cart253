
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
    let micLevel = mic.getLevel(); // Get microphone volume

    let step = map(micLevel, 0, 1, 0, 10); // Create variable that maps the car location to the microphone input
    this.y -= step; // Add's car y postion eachtime their is microphone input
  }

  move() { // Add velocity to position for movement
    this.x += this.vx; // Horizontaly Move the car (N/A)
    this.y += this.vy; // Vertically Move the car
  }

  display() { // Displays the audioCar as a circle
    push(); // Isolates code from using global properties.
    fill(this.fill); // Makes the car white in colour
    noStroke(); // Removes ellipse stroke
    ellipse(this.x,this.y,this.size); // Displays the cars x position, y position and size as an ellipse
    pop(); // Isolates code from using global properties.
  }
}
