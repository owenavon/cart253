/***********************
I'm not a Robot
Owen Avon

Displays the BigObstacle
***********************/

class BigObstacle extends Obstacle { // Creates a class that is called from script.js
  constructor(x, y) { // function that creates an instance of a class.
    super(x, y); // Connects obstacle to BigObstacle.
    this.width = 50; // Assigns a width value to the rectangle.
    this.height = 50; // Assigns a height value to the rectangle.
    this.speed = 5; // Assigns a velocity to the BigObstacle.
  }

  display() {
    super.display();
    push(); // Isolates code from using global properties.
    rectMode(CENTER); // Draws rectangle from centre point.
    fill(255, 0, 0); // Displays the obstacle as red in colour.
    noStroke(); // Removes shape stroke
    rect(this.x, this.y, this.width, this.height); // Displays the rectangle at certain coordinates.
    pop(); // Isolates code from using global properties.
  }
}
