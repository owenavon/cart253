class Motorcycle extends Vehicle { // Allows Motorcycle class (child) to inherit Vehicle class (Parent) parameters
  constructor(x, y) {
    super(x, y);
    this.width = 30; // Only setup the properties that are particular to the motorcycle
    this.height = 10;
    this.vx = 10;
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill (255, 255, 0); // Specific colour
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
