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

    //calculates how many gallons will be used to travel x number of miles
    findGallonsUsed(miles) {
        const gallons = miles / this.efficiency;
        return gallons;
    }

    //calculates the cost to fill up a provided number of gallons
    fillCost(gasPrice, gallons) {
        const cost = gallons * gasPrice;
        return cost;
    }

    //finds how many gallons are required to fill the tank
    findGallons (gasReading){
        return this.tankSize * (1 - gasReading);
    }

    //rounds a number to 2 decimal places
    roundTwoDecimals (num){
        return Math.round(num * 100) / 100;
    }

    //creates a result object with gallons and cost for both close and distance station. Also contains savings and time spent. Returns null if there isn't enough gas in tank to reach far station.
    compareCost(gasObj, gasReading, miles) {
        const result = {};

        //gallons required for round trip
        let gallonsRequired = this.findGallonsUsed(miles);
        let gallonsInTank = gasReading * this.tankSize;

        //checks if gas station is too far for a one way trip
        if (gallonsRequired / 2 > gallonsInTank) {
            return null;
        }
        result.closeGallons = this.findGallons(gasReading);
        result.closeCost = this.fillCost(gasObj.close, result.closeGallons);
        result.farGallons = result.closeGallons + gallonsRequired;
        result.farCost = this.fillCost(gasObj.far, result.farGallons);
        result.savings = this.roundTwoDecimals(-(result.farCost - result.closeCost));
        result.time = Math.round(miles / 65 * 60);
        result.labor = Math.round(100 * (result.savings / (result.time / 60))) / 100;
        return result;
    }
}



module.exports = Car;