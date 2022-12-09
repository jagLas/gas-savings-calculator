class Car {
    constructor(make, model, year, efficiency, tankSize){
        this.make = make;
        this.model = model;
        this.year = year;
        this.efficiency = efficiency;
        this.tankSize = tankSize;
        Car.allCars.push(this);
    }

    static allCars = [];

    findGallonsUsed(miles) {
        const gallons = miles / this.efficiency;
        return gallons;
    }

    fillCost(gasPrice, gallons) {
        const cost = gallons * gasPrice;
        return cost;
    }

    findGallons (gasReading){
        return this.tankSize * (1 - gasReading);
    }

    roundTwoDecimals (num){
        return Math.round(num * 100) / 100;
    }

    compareCost(gasObj, gasReading, miles) {
        const result = {};
        result.closeGallons = this.findGallons(gasReading);
        result.closeCost = this.fillCost(gasObj.close, result.closeGallons);
        result.farGallons = this.findGallons(gasReading) + this.findGallonsUsed(miles);
        result.farCost = this.fillCost(gasObj.far, result.farGallons);
        result.savings = this.roundTwoDecimals(-(result.farCost - result.closeCost));
        result.time = Math.round(miles / 65 * 60);
        return result;
    }
}



module.exports = Car;