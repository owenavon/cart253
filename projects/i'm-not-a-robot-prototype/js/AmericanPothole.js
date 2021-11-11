
class AmericanPothole extends Pothole {
  constructor(x, y) {
    super(x, y);
    this.width = 25;
    this.height = 25;
    this.speed = 3;
  }

  display() { // // Displays the CanadianPothole as blue
    super.display();
    push(); // Isolates code from using global properties.
    rectMode(CENTER);
    fill(0, 0, 255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    pop(); // Isolates code from using global properties.
  }
}
