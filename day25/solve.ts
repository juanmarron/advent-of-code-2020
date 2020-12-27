const divide = 20201227

function solve(input : Array<string>) : number {
    const cardKey = +input[0]
    const doorKey = +input[1]

    let subjectNumber = 7

    const loopSizeCard = findLoopSize(cardKey, subjectNumber)
    const loopSizeDoor = findLoopSize(doorKey, subjectNumber)

    return transform(doorKey, loopSizeCard)
}

function findLoopSize(key : number, subjectNumber : number) {
    let loopSize = 0
    let start = 1
    while (start !== key) {
        start = (start*subjectNumber)%20201227
        loopSize++
    }
    
    return loopSize
}

function transform(subject : number, loopSize : number) : number {
    let start = 1
    for (let i = 0; i < loopSize; i++) {
        start = (start*subject)%20201227
    }

    return start
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input))
}

main()