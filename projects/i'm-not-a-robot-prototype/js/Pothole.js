
class Pothole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = undefined;
    this.height = undefined;
    this.vx = 0;
    this.vy = 0;
    this.speed = undefined;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  wrap() { // Wrap to the other side of the canvas when the potholes leaves it
    if (this.x > width) {
      this.x -= width;
    } else if (this.x < 0) {
      this.x += width;
    }
  }

  display() { // Here to remind me to implement a display method in the child classes

  }
}
