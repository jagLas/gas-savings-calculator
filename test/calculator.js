const Car = require('../class/car')
const Gas = require('../class/gas')

const car1 = new Car('Hyundai', 'Elantra', 2018, 40, 14)
const gas1 = new Gas (3 , 2);


debugger
console.log(car1.compareCost(gas1, 1/14, 40));
// console.log(Car.allCars);