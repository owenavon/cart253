// Experimenting with inheritance and polymorphism
// Owen Avon

// Learning and experimenting with inheritance and polymorphism

"use strict";

let cars = [];
let numCars = 10;

let motorcycles = [];
let numMotorcycles = 10;

// Description of setup()
function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    cars.push(car);
  }

  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    motorcycles.push(motorcycle);
  }
}

// Description of draw()
function draw() {
  background(0);

  for (let i = 0; i < cars.length; i++) {
    let car = cars[i];
    car.move(); // Found in the Vehicle class
    car.wrap(); // Found in the Vehicle class
    car.display(); // Found in the Car class
  }

  for (let i = 0; i < motorcycles.length; i++) {
    let motorcycle = motorcycles[i];
    motorcycle.move(); // Found in the Vehicle class
    motorcycle.wrap(); // Found in the Vehicle class
    motorcycle.display(); // Found in the Motorcycle class
  }
}

// Script does not need to change when working with inheritance.
