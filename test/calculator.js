const Car = require('../class/car')
const Gas = require('../class/gas')

const car1 = new Car('Hyundai', 'Elantra', 2018, 40, 14)
const car2 = new Car('Chevy', 'Bolt', 2022, 80, 10)
const gas1 = new Gas (3 , 2);

console.log(car1.compareCost(gas1, 1/2, 40));
// console.log(Car.allCars);
console.log(car2.compareCost(gas1, 1/2, 40));