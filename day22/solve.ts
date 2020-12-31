
function solve(input : Array<string>) : number {
    const p1Idx = input.indexOf("Player 1:")
    const p2Idx = input.indexOf("Player 2:")

    const p1Cards = input.slice(p1Idx+1, p2Idx-1).map(e => +e.trim()).reverse()
    const p2Cards = input.slice(p2Idx+1).map(e => +e.trim()).reverse()

    let count = 0
    // I thought that the below statement would work because empty array evaluates to falsey value, but apparently it doesn't
    // while (p1Cards && p2Cards) {
    while (p1Cards.length > 0 && p2Cards.length > 0) {
        const p1Pop = p1Cards.pop()
        const p2Pop = p2Cards.pop()

        if (p1Pop > p2Pop) {
            p1Cards.unshift(p1Pop)
            p1Cards.unshift(p2Pop)
        } else if (p2Pop > p1Pop) {
            p2Cards.unshift(p2Pop)
            p2Cards.unshift(p1Pop)
        } else {
            throw new Error("they're equal and it's not specified what to do")
        }
    }

    return Math.max(calculateScore(p1Cards), calculateScore(p2Cards))
}

function calculateScore(cards : Array<number>) : number {

    let score = 0

    cards.forEach((e,idx) => {
        score += e*(idx+1)
    })

    return score
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