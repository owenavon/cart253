/***********************
I'm not a Robot
Owen Avon

Code for the Obstacle class and it's subsequent functions
***********************/

class Obstacle { // Creates a class that is called from script.js
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = undefined;
    this.height = undefined;
    this.vx = 0;
    this.vy = 0;
    this.speed = undefined;
    this.xOffset = 0; // Creates an offset value for noise function.
  }

  move() {
    // this.x = this.x + this.vx; // Allows obsatcles to translate on the x-axis
    // this.y = this.y + this.vy; // Allows obsatcles to translate on the y-axis (N/A)

    this.x = map(noise(this.xOffset), 0, 1, 0, width); // Maps noise function with the obstacle and offset value
    this.xOffset = this.xOffset + 0.005; // Sets value to offset, which in turns translates obstacles left and right within the provided value.
  }

  wrap() {
    // Wrap to the other side of the canvas when the potholes leaves it
    if (this.x > width) {
      this.x -= width;
    } else if (this.x < 0) {
      this.x += width;
    }
  }

  display() {
    // Here to remind me to implement a display method in the child classes
  }
}
