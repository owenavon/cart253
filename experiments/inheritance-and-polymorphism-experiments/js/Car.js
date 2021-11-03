class Car extends Vehicle { // Allows Car class (child) to inherit Vehicle class (Parent) parameters
  constructor(x, y) {
    super(x,y); // Call the super class's constructor (vehicle)
    this.width = 50; // Width of car. Only setup the properties that are particular to the car
    this.height = 20; // Height of car
    this.vx = 5; // Horizontal velocity of car
    this.drunkenness = 0.2;
  }

  move() { // Overriding methods Defines a method inside our sub class
    this.veer(); // We get the specific class behavior

    super.move(); // Uses the super class to call the Vehicle version of wrap. We get the Super class behavior
  }

  veer() {
    let r = random();
    if (r > this.drunkenness) {
      this.vy = random(-5, 5);
    }
  }

  wrap() {
    super.wrap(); // Uses the super class to call the Vehicle version of wrap

    if (this.y > height) {
      this.y -= height;
    }
    else if (this.y < 0) {
      this.y += height;
    }
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
