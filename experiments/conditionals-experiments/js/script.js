
// Experimenting with Conditionals
// Owen Avon

// Learning and experimenting with conditionals

"use strict";

// let dangerZone = {
//   x: 250,
//   y: 250,
//   size: 150
// }

// let backgroundShade = 0;
// let circle = {
//   x: 0,
//   y: 250,
//   size: 100,
//   speed: 1,
// }

// let displayCircle = false; // Don't display circle untill we click on canvas.

// let bg = {
//   r: 0,
//   g: 0,
//   b: 0,
// }

// let circle = {
//   x: 250,
//   y: 250,
//   size: 100,
//   vx: 0,
//   vy: 0,
//   ax: 0,
//   ay: 0,
//   acceleration: 0.25,
//   maxSpeed: 5

let angle = 0;
let rectScale = 0;


// Description of setup()
function setup() {
  createCanvas(500, 500);

  // circle.x = random(0, width);
  // circle.y = random(0, height);
}

// Description of draw()
function draw() {
  background(127);

  push();
  fill(255, 0, 0);
  rectMode(CENTER);
  translate(width / 2, height / 2);
  rotate(angle);
  scale(rectScale);
  rect(0, 0, 100, 100);
  pop();

  angle = angle + 0.01;
  rectScale = rectScale + 0.01;

// push();
// fill(255, 0, 0);
// rect(0, 0, 100, 100);
// pop();
//
// push();
// translate(200, 100);
// fill(0, 255, 0);
// rect(0, 0, 100, 100);
// pop();
//
// push();
// translate(0, 200);
// fill(0, 0, 255);
// rect(0, 0, 100, 100);
// pop();

  // push();
  // fill(255, 0, 0);
  // stroke(0, 255, 255);
  // strokeWeight(10);
  // rect(100, 100, 100, 100);
  // pop();
  //
  // push();
  // fill(0, 0, 255);
  // rect(300, 100, 100, 100);
  // pop();
}

  // if (mouseX < circle.x) {
  //   circle.ax = -circle.acceleration;
  // }
  // else {
  //   circle.ax = circle.acceleration;
  // }
  //
  // if (mouseY < circle.y) {
  //   circle.ay = -circle.acceleration;
  // }
  // else {
  //   circle.ay = circle.acceleration;
  // }
  //
  // circle.vx = circle.vx + circle.ax;
  // circle.vx = constrain (circle.vx, -circle.maxSpeed, circle.maxSpeed);
  // circle.vy = circle.vy + circle.ay;
  // circle.vy = constrain (circle.vy, -circle.maxSpeed, circle.maxSpeed);
  //
  // circle.x = circle.x + circle.vx;
  // circle.y = circle.y + circle.vy;
  //
  // ellipse(circle.x, circle.y, circle.size);

// function mousePressed() {
//   bg.r = random(0, 255);
//   bg.g = random(0, 255);
//   bg.b = random(0, 255);
// }

//   let d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
//   while (d < circle.size / 2 + dangerZone.size/2) {
//     circle.x = random(0, width);
//     circle.y = random(0, height);
//     d = dist(circle.x, circle.y, dangerZone.x, dangerZone.y);
//   }
// }

// Danger zone
// noFill();
// stroke(255, 0, 0);
// ellipse(dangerZone.x, dangerZone.y, dangerZone.size);
//
//
//
//   fill (255);
//   noStroke();
//   ellipse(circle.x, circle.y, circle.size);

  // let x = caterpillar.x;
  // let numSegments = 10;
  // let segmentsDrawn = 0;
  //
  // while (segmentsDrawn < numSegments) { // Like an if satement ince it keeps doing the action inside until it becomes false
  //   ellipse(x, caterpillar.y, caterpillar.segmentSize); // Happens right away. You cannot animate with this. Happens in one frame.
  //   x = x + 40;
  //   segmentsDrawn ++; // segmentsDrawn = segmentsDrawn + 1;
  //   }

    // let x = caterpillar.x;
    // let numSegments = 10;
    //
    // for (let segmentsDrawn = 0; segmentsDrawn < numSegments; segmentsDrawn++) { // Can replace segmentsDraw with "i". Specialised version of whileloop's based on counting.
    //   ellipse(x, caterpillar.y, caterpillar.segmentSize); // Most common loops are loops that counts from zero up to a set number.
    //   x = x + 40;
    // }

  // ellipse(x, caterpillar.y, caterpillar.segmentSize);
  // x = x + 40;
  //
  // ellipse(x, caterpillar.y, caterpillar.segmentSize);
  // x = x + 40;
  //
  // ellipse(x, caterpillar.y, caterpillar.segmentSize);
  // x = x + 40;
  //
  // ellipse(x, caterpillar.y, caterpillar.segmentSize);
  // x = x + 40;
  //
  // ellipse(x, caterpillar.y, caterpillar.segmentSize);

  // background(0);
  //
  // if (mouseIsPressed) {
  //   displayCircle = true; // If we click, then display white circle.
  // }
  //
  // if (displayCircle) {
  //   ellipse(250, 250, 100, 100);
  //   }

  // background(backgroundShade);
  //
  // circle.x = circle.x + circle.speed;
  //
  // fill(255, 255, 255);
  //
  // if (!(circle.x < width/3)) {
  //   fill(255, 0, 0);
  // }

  // if (circle.x < width/3 || circle.x > 2 * width/3) {
  //   fill(255, 0, 0);
  // }

  // if (mouseX < width/3) {
  //   fill(255, 0, 0);
  // }
  // else if (mouseX < 2 * width/3) {
  //   fill(0, 255, 0);
  // }
  // else {
  //   fill (0, 0, 255);
  // }

  // ellipse(circle.x, circle.y, circle.size);

  // if (circle.x > width) {
  //   circle.speed = -circle.speed;
  // }
  //
  // if (circle.x < 0) {
  //   circle.speed = -circle.speed;
  // }
  //
  // if (mouseY < height/2) {
  //   fill(255, 0, 0)
  // }
  //
  // if (mouseY > height/2) {
  //   fill(0, 0, 255)
  // }
