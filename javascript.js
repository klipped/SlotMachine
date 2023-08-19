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
};

function getNumberOfLines() {
    while (true) {
        const lines = prompt("How many lines would you you like to bet on (1-5): ");
        const numberOfLines = parseInt(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 5) {
            console.log("Invalid amount of lines");
        } else {
        return numberOfLines;
        }
    }
};

function getUserBetAmounts(balance, lines) {
    while (true) {
        const bet = prompt("How much would you like to bet per line?: ");
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
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < COLLUMS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
       for (let j = 0; i < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

function transpose(reels) {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLLUMS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows
};

function slotNumbers(rows) {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol; 
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }   
        console.log(rowString)
    }
};

function getWinnings(rows, bet, lines) {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
};

function game() {
let balance = depositMoney();

while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getUserBetAmounts(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spinSlot();
    const rows = transpose(reels);
    slotNumbers(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
        console.log("You dont have enough funds to play");
        break;
    }
    const playAgain = prompt("Would you like to play again (y/n)? ");
    if (playAgain != "y") break;
    }
};



game(); 