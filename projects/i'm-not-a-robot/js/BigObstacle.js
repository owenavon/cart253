
class BigObstacle extends Obstacle {
  constructor(x,y) {
    super(x,y);
    this.width = 50;
    this.height = 50;
    this.speed = 5;
  }

  display() { // Displays the CanadianPothole as red
    super.display();
    push(); // Isolates code from using global properties.
    rectMode(CENTER);
    fill(255,0,0);
    noStroke();
    rect(this.x,this.y,this.width,this.height);
    pop(); // Isolates code from using global properties.
  }
}
