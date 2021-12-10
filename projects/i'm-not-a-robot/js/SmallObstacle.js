/***********************
I'm not a Robot
Owen Avon

Displays the SmallObstacle
***********************/

class SmallObstacle extends Obstacle { // Creates a class that is called from script.js
  constructor(x, y) { // function that creates an instance of a class.
    super(x, y); // Connects SmallObstacle to Obstacle.
    this.width = 25; // Assigns a width value to the rectangle.
    this.height = 25; // Assigns a height value to the rectangle.
    this.speed = 3; // Assigns a velocity to the SmallObstacle.
  }

  display() {
    // // Displays the CanadianPothole as blue
    super.display();
    push(); // Isolates code from using global properties.
    rectMode(CENTER); // Draws rectangle from centre point.
    fill(0, 0, 255); // Displays the obstacle as blue in colour.
    noStroke(); // Removes shape stroke
    rect(this.x, this.y, this.width, this.height); // Displays the rectangle at certain coordinates.
    pop(); // Isolates code from using global properties.
  }
}
