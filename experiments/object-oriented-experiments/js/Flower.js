class Flower {

  constructor(x, y, size, stemLength, petalColor) { // Functions inside of classes are Referred to as methods.
    // Position and size information
    this.x = x; // Variable is called "this" Refers to current object.
    this.y = y;
    this.size = size;
    this.stemLength = stemLength;
    this.stemThickness = 10;
    this.petalThickness = 10;
    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50
    };
    this.petalColor = petalColor;
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0
    };
  }

  display() {
    push();
    // Draw a line for the stem
    strokeWeight(this.stemThickness);
    stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Draw a circle with a heavy outline for the this
    strokeWeight(this.petalThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

}
