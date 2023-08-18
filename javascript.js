// 1. deposit money done
// 2. determine number of lines to bet on       done
// 3. collect bet amount            done
// 4. spin the slot         
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

// const deposit = () => {}




const prompt = require("prompt-sync")();

const ROWS = 5;
const COLLUMS = 5;

//items in our slot
const SYMBOLS_COUNT = {
    "A": 5,
    "B": 7,
    "C": 3,
    "D": 5,
    "E": 4,
    "F": 5,
    "G": 8
};

//multiplier 
const SYMBOLS_VALUES = {
    "A": 7,
    "B": 6,
    "C": 5,
    "D": 4,
    "E": 3,
    "F": 2,
    "G": 1
};





function depositMoney() {
    while (true) {
        const depositAmount = prompt("Enter amount you would like to deposit: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount");
        } else {
        return numberDepositAmount;
        }
    }
}

function getNumberOfLines() {
    while (true) {
        const lines = prompt("How much would you like to bet per line (1-5): ");
        const numberOfLines = parseInt(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 5) {
            console.log("Invalid amount of lines");
        } else {
        return numberOfLines;
        }
    }
}

function getUserBetAmounts(balance, lines) {
    while (true) {
        let bet = prompt("How much would you like to bet?: ");
        const betAmount = parseFloat(bet);

        if (isNaN(betAmount) || betAmount <= 0) {
            console.log("Invalid bet");
        } else if ( betAmount > balance / lines) {
            console.log("Not enough Funds");
        } else {
        return betAmount;
        }
    }
}

function spinSlot() {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        console.log(symbol, count);
        
    }
    // for (let i = 0 ; i < 5; ++i){
  
    // }
}

spinSlot();
let balance = depositMoney();
const numberOfLines = getNumberOfLines();
const bet = getUserBetAmounts(balance, numberOfLines);
