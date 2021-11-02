class Car extends Vehicle { // Allows Car class (child) to inherit Vehicle class (Parent) parameters
  constructor(x, y) {
    super(x,y); // Call the super class's constructor (vehicle)
    this.width = 50; // Width of car. Only setup the properties that are particular to the car
    this.height = 20; // Height of car
    this.vx = 5; // Horizontal velocity of car
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill (255, 0, 0); // Specific colour
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
