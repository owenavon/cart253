class SportsCar extends Car { // SportsCar extends the car class, while the car class extends the vehicle class

  constructor(x, y) {
    super(x, y);
    this.vx = 15;
  }

  display() {
    super.display(); // Displays the car

    push();
    rectMode(CENTER);
    fill (255, 255, 0);
    noStroke();
    rect(this.x, this.y - this.height / 10, this.width, this.height / 20); // Line relative to the car. 10th of the width of the car. Offsets the line upwards
    rect(this.x, this.y + this.height / 10, this.width, this.height / 20); // Offsets the line downwards
    pop();
  }

}
