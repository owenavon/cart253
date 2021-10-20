
// Experimenting with "arrays"
// Owen Avon

// Learning and experimenting with "arrays"

"use strict";

let school = [];
let schoolSize = 10;

// Foods
let fish1;
let fish2;
let fish3;
let fish4;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0, width), random(0, height));
    school.push(fish);
    // school [i] = createFish(random(0, width), random(0, height)); // Same outcome
  }

  // school [0] = createFish(random(0, width), random(0, height)); // index 0, element at index 0
  // school [1] = createFish(random(0, width), random(0, height)); // index 1, element at index 1
  // school [2] = createFish(random(0, width), random(0, height)); // index 2, element at index 2
  // school [3] = createFish(random(0, width), random(0, height)); // index 3, element at index 3
}

function createFish (x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
  };
  return fish;
}

function draw() {
  background(0);

  for (let i = 0; i < school.length; i++ ) {
    moveFish(school[i]);
    displayFish(school[i]);
  }

  // moveFish(school[0]);
  // moveFish(school[1]);
  // moveFish(school[2]);
  // moveFish(school[3]);

  // displayFish(school[0]);
  // displayFish(school[1]);
  // displayFish(school[2]);
  // displayFish(school[3]);
}

// Sets the user position to the mouse position
function moveFish(fish) {
  let change = random(0, 1);
  if (change < 0.05) { // 5% chance that the fish change direction.
    fish.vx = random (-fish.speed, fish.speed);
    fish.vy = random (-fish.speed, fish.speed);
  }

  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

function displayFish (fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

function mousePressed() {
  let fish = createFish(mouseX, mouseY);
  school.push (fish);
}
