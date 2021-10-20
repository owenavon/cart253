// Experimenting with "more arrays"
// Owen Avon

// Learning and experimenting with "more arrays"

"use strict";



// Random calling array

// let images = [];
// let displayImage;
//
// function preload() {
//   for (let i = 0; i < 10; i++) {
//     // images[i] = loadImage(`assets/images/clown-${i}.png`);
//     let clownImage - loadImage (`assets/images/clown-${i}.png`);
//     images.push(clownImage);
//   }
//
// // images [0] = loadImage(`assets/images/clown-0.png`);
// // images [1] = loadImage(`assets/images/clown-1.png`);
// // images [2] = loadImage(`assets/images/clown-2.png`);
// // images [3] = loadImage(`assets/images/clown-3.png`);
// // images [4] = loadImage(`assets/images/clown-4.png`);
// // images [5] = loadImage(`assets/images/clown-5.png`);
// // images [6] = loadImage(`assets/images/clown-6.png`);
// // images [7] = loadImage(`assets/images/clown-7.png`);
// // images [8] = loadImage(`assets/images/clown-8.png`);
// // images [9] = loadImage(`assets/images/clown-9.png`); // I do not have these images. Coded for practice.
// }
//
// function setup() {
//   createCanvas(600, 600);
//
//   displayImage = random(images);
// }
//
// function draw() {
//   background(0);
//
//   push();
//   imageMode(CENTER);
//   image(displayImage, width / 2, height / 2);
//   pop();
// }



// Random calling array

// let barkSFX;
//
// let rates = [1.5, 1.75, 2.25, 2.5, 2.75, 3];
//
// function preload() {
//   barkSFX = loadSound (`assets/sounds/bark.wav`);
// }
//
// function setup() {
//   createCanvas(600, 600);
// }
//
// function draw() {
//   background(0);
// }
//
// function mousePressed () {
//   let randomRate = random(rates);
//   barkSFX.rate(randomRate);
//   barkSFX.play();
// }



// Sequential array

let circle = {
  x: 0,
  y: 0,
  size: 100,
  trail: [],
  trailSize: 20
};

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);

  circle.x = mouseX;
  circle.y = mouseY;

  for (let i = 0; i < circle.trail.length; i++) {
    let position = circle.trail[i];
    ellipse(position.x, position.y, circle.size);
  }

  ellipse(circle.x, circle.y, circle.size);

  let newTrailPosition = {
    x: circle.x,
    y: circle.y
  };
  circle.trail.push(newTrailPosition);

  if (circle.trail.length > circle.trailSize) {
    circle.trail.shift(); // Removes the oldest element at index 0
  }
}



// Sequential array

// let soliloquy = [
//   `To be or not to be`,
//   `That is the question`,
//   `Whether 'tis nobler in the mind'`,
//   `To suffer the slings and arrows`,
//   `Of outrageous fortune`,
//   `Or to take arms`,
//   `Against a sea of sorrows`,
//   `And by opposing end them.`,
// ];
//
// let currentIndex = 0;
//
// function setup() {
//   createCanvas(600, 600);
//   textAlign(CENTER, CENTER);
//   textSize(32);
//   fill(255);
// }
//
// function draw() {
//   background(0);
//   text(soliloquy[currentIndex], width / 2, height / 2);
// }
//
// function mousePressed() {
//   currentIndex = currentIndex + 1;
//   if (currentIndex === soliloquy.length) {
//     // currentIndex = soliloquy.length -1;
//     currentIndex = 0;
//   }
// }
