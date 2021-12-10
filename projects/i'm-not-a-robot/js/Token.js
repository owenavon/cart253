/***********************
I'm not a Robot
Owen Avon

Displays the Token class and it's subsequent functions
***********************/

class Token { // Creates a class that is called from script.js
  constructor(horizontal, vertical, tokenSize, centreColor, outerColor) { // function that creates an instance of a class.
    this.x = horizontal; // Defines the x postion in generateToken function.
    this.y = vertical; // Defines the y postion in generateToken function.
    this.size = tokenSize; // Defines the token size in the generateToken function.
    this.maxSize = tokenSize; // Defines the token's maxium size in the generateToken function.
    this.centreColor = centreColor; // Defines the token's centre color the generateToken function.
    this.outerColor = outerColor; // Defines the token's outer color in the generateToken function.
    this.tokenThickness = 8; // Provides the token's stroke thickness.
    this.maxTokenThickness = 8; // Provides the token's maxium stroke thickness.
    this.shrinkage = 3; // Assigns a value to the amount the token will decrease upon overlap.
    this.view = true; // Creates a boolean value to say that the variable is being "viewed" upon starting the simulation.
  }

  display() {
    // Draw a circle with a heavy outline for the this
    push(); // Isolates code from using global properties.
    strokeWeight(this.tokenThickness); // Calls object to provide stroke thickness.
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b); // Calls object to color token's fill.
    stroke(this.outerColor.r, this.outerColor.g, this.outerColor.b); // Calls object to color token's stroke.
    ellipse(this.x, this.y, this.size); // Creates the circle shape.
    pop(); // Isolates code from using global properties.
  }

  disappear() {
    // Function that is called inside of tryToTouchToken in Ball.js
    this.size = this.size - this.shrinkage; // States that the token is to shrink upon overlap

    if (this.size <= 0) {
      // States that if the token size becomes zero (0), then...
      this.view = false; // set the boolean value to false, and thus stop drawing the token on the canvas.
    }
  }
}
