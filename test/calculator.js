const Car = require('../class/car')
const Gas = require('../class/gas')

const car1 = new Car('Hyundai', 'Elantra', 2018, 40, 14)
const gas1 = new Gas (2.95 + .70 , 2.95);


debugger
console.log(car1.compareCost(gas1, 1/14, 41));
console.log(Car.allCars);
console.log();
console.log();