// 1. Deposit money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if player won
// 6. Give player their winnings
// 7. Play again

const prompt = require('prompt-sync')()

const ROWS = 3
const COLS = 3

const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while(true){
        const depositAmnt = prompt('Enter a deposit amount: ')
        const depositNumber = parseFloat(depositAmnt)

        if(isNaN(depositNumber) || depositNumber <= 0){
        console.log('Enter a valid deposit')
        }
        else{
            return depositNumber
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const numberOfLines = prompt('Enter a line to bet on (1-3): ')
        const lineNumber = parseFloat(numberOfLines)

        if(isNaN(lineNumber) || lineNumber <= 0  || lineNumber > 3){
        console.log('Invalid number of lines, try again.')
        }
        else{
            return lineNumber
        }
    }
}

const getBet = (balance, numberOfLines) => {
    while(true){
        const bet = prompt('Enter the bet per line: ')
        const numberBet = parseFloat(bet)

        if(isNaN(numberBet) || numberBet <= 0  || numberBet > (balance / numberOfLines)){
        console.log('Invalid bet, try again.')
        }
        else{
            return numberBet
        }
    }
}

const spin = () => {
    const symbols = []
    for (const[symbol, count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbols)
        }
    }
    const reels = []
    for (let i = 0; i < COLS; i++){
        reels.push([])
        const reelSymbols = [...symbols]
        for (let j = 0;  j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSym = reelSymbols[randomIndex]
            reels[i].push(selectedSym)
            reelSymbols.splice(randomIndex, 1)
        }
    }

    return reels
}

const transpose = (reels) => {
    const rows = []
    for(let i = 0; i < ROWS; i++){
        rows.push([])
        for(let j = 0; j < COLS; j++){
           rows[i].push(reels[j][i]) 
        }
    }
    return rows
}

const print = (rows) => {
    for(row of rows){
        let rowString = ''
        for (const [i, symbol] of rows.entries()){
            rowString += symbol
            if(i  !== rows.length -1 ){
                rowString += '|'
            }
        }
    }
}

const getWinnings = (rows, bet, numberOfLines) => {
    let winnings = 0

    for (let row = 0; row < numberOfLines; row++){
        const symbols = rows[row]
        let allSame = true

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
            }
    }
    return winnings
} 

let balance = deposit()
const  numberOfLines = getNumberOfLines()
const bet = getBet(balance)
const reels = spin()
const rows = transpose(reels)
print(rows)
const winnings = getWinnings(rows, bet, numberOfLines)
console.log('You won $' + winnings.toString())