class Token {

  constructor(horizontal, vertical, tokenSize, centreColor, outerColor) { // Functions inside of classes are Referred to as methods.
    // Position and size information
    this.x = horizontal; // Variable is called "this" Refers to current object.
    this.y = vertical;
    this.size = tokenSize;
    this.maxSize = tokenSize;
    this.centreColor = centreColor;
    this.outerColor = outerColor;
    this.tokenThickness = 10;
    this.maxTokenThickness = 10;
  }

  display() {
    push();
    // Draw a circle with a heavy outline for the this
    strokeWeight(this.tokenThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.outerColor.r, this.outerColor.g, this.outerColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
