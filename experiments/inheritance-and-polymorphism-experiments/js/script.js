// Experimenting with inheritance and polymorphism
// Owen Avon

// Learning and experimenting with inheritance and polymorphism

"use strict";

let vehicles = []; // Single array that contains all of the vehicles
let numCars = 10;
let numMotorcycles = 10;
let numSportscars = 3;

// Description of setup()
function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car); // Array is the first section
  }

  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    vehicles.push(motorcycle);
  }

  for (let i = 0; i < numSportscars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let sportscar = new SportsCar(x, y);
    vehicles.push(sportscar); // Array is the first section
  }
}

// Description of draw()
function draw() {
  background(0);

  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();
  }
}

// Script does not need to change when working with inheritance.
