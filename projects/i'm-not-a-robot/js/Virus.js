class Virus{ // Creates a class that is called from script.js

  constructor(horizontal, vertical, tokenSize, color) { // function that creates an instance of a class.
    this.x = horizontal; // Defines the x postion in generateToken function.
    this.y = vertical; // Defines the y postion in generateToken function.
    this.size = tokenSize; // Defines the token size in the generateToken function.
    this.maxSize = tokenSize; // Defines the token's maxium size in the generateToken function.
    this.color = color; // Defines the token's centre color the generateToken function.

    this.shrinkage = 3; // Assigns a value to the amount the token will decrease upon overlap.
    this.view = true; // Creates a boolean value to say that the variable is being "viewed" upon starting the simulation.
  }

  display() { // Draw a circle with a heavy outline for the this
    push(); // Isolates code from using global properties.
    noStroke();
    fill(this.color.r, this.color.g, this.color.b); // Calls object to color token's fill.
    ellipse(this.x, this.y, this.size); // Creates the circle shape.
    pop(); // Isolates code from using global properties.
  }

  }
