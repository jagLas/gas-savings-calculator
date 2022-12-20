const Car = require ('./class/car')
const Gas = require ('./class/gas')

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let car = new Car ('Grundai', 'Crelantra', 2022, 35, 10);
let gas = new Gas (3, 2)
let miles = 50;
let gasReading = 1/2;
let result;

function initialize () {
    if (Car.allCars[0] === car) {
        console.log('\ndefaults loaded:');
    }
    console.log('')
    console.log(car);
    console.log('')
    console.log(gas);
    console.log('')
    console.log(`miles: ${miles}    gas reading: ${gasReading}\n\n`)


    rl.question('What would you like to do? \n    run\n    start over\n    quit\n\n>', response =>{
        if (response === 'run') {
            showInfo();
        } else if (response === 'start over') {
            makeCar();
        } else if (response === 'quit') {
            rl.close()
        } else if (answer === 'change a parameter') {
            console.log('feature not added');
            rl.close();
        } else {
            console.log('Please enter a valid option')
            initialize();
        }
    })
}

function makeCar() {
    const makePrompt = () => rl.question('What is the make of your car?\n', (make) => modelPrompt(make));

    const modelPrompt = (...answers) => rl.question('What is the model of your car?\n', model => yearPrompt(...answers, model));
    
    const yearPrompt = (...answers) => rl.question('What is the year?\n', year => efficiencyPrompt(...answers, year));
    
    const efficiencyPrompt = (...answers) => rl.question('What is the cars fuel efficiency in miles per gallon?\n', efficiency => tankSizePrompt(...answers, Number(efficiency)));
    
    const tankSizePrompt = (...answers) => rl.question('What is the cars tank size in gallons?\n', size => {
        car = new Car (answers[0], answers[1], answers[2], answers[3], Number(size));
        makeGas();
    });

    makePrompt();
}

function makeGas() {
    rl.question('How much does gas cost where you currently are?\n', close => {
        rl.question('How much does gas cost where you want to drive to?\n', far => {
            gas = new Gas(Number(close), Number(far));

            askMiles();
        })
    })
}

function askTankLevel () {
    rl.question('Using a decimal or fraction from 0 - 1, how full is your tank?\n    For example: enter "1/2" if you have half of a tank\n', answer => {
        gasReading = eval(answer);
        showInfo();
    })
}

function askMiles() {
    rl.question('How far, there and back, do you have to drive in miles?\n', answer => {
        miles = Number(answer);
        askTankLevel();
    });
}

function showInfo() {

    result = car.compareCost(gas, gasReading, miles);

    let savingsMessage;
    if (result === null) {
        console.log('\n\n\n\nUh-oh, you might run out of gas before you get there!\n')
    } else if (result.savings < 0) {
        savingsMessage = `lost $${-result.savings}`;
        showResult();
    }   else{
        savingsMessage = `saved $${result.savings}`;
        showResult();
    }

    function showResult() {
        console.log(`\n\n\n\n  You ${savingsMessage} and spent ${result.time} minutes driving your ${car.year} ${car.make} ${car.model} ${miles} miles for gas.\n  Do you think your time is worth $${result.labor} per hour to do so?\n\n`)
    }
    endMenu();
}

function endMenu () {
    rl.question(`What would you like to do?\n    run it again\n    quit\n\n>`, response =>{
        let answer = response.toLowerCase();
        
        if (answer === 'quit') {
            rl.close();
        } else if (answer === 'run it again') {
            initialize();
        } else {
            console.log(`\nplease type a valid input`);
            endMenu();
        }
    })
}

function changeParameter() {
    rl.question('\n\nWhat parameter would you like to modify?\n  car\n  gas prices\n',)
}

initialize();