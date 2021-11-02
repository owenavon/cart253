class Vehicle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = undefined; // Remain undefined as the car and motorcycle each have their own width
    this.height = undefined; // Remain undefined as the car and motorcycle each have their own height
    this.vx = 0;
    this.vy = 0;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  display() {
    // Define this in the subclasses
  }
}
