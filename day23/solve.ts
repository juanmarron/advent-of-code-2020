import {cloneDeep} from 'lodash';

function solve(input : string, numMoves : number) : string {
    let cups = input.split('').map(x => +x)
    let newCups : Array<number> = cloneDeep(cups)
    let currentCup = cups[0]

    for (let i = 1; i <= numMoves; i++) {
        const triplet = get3Clockwise(currentCup, cups)
        // could also use splice
        newCups = cups.filter(c => !triplet.includes(c))
        // Pass newCups because it already filtered out the triplet
        const destination = findDestination(currentCup, newCups)
        // place triplet immediately after the destination cup
        const idx = newCups.indexOf(destination)
        newCups = newCups.slice(0, idx + 1).concat(triplet).concat(newCups.slice(idx+1))

        cups = newCups
        currentCup = cups[((cups.indexOf(currentCup) + 1) % cups.length)]
    }

    const idx1 = newCups.indexOf(1)
    const clockwiseAfter1 = newCups.slice(idx1+1).concat(newCups.slice(0,idx1))

    return clockwiseAfter1.join("").toString()
}

function get3Clockwise(currentCup : number, cups : Array<number>) : Array<number> {
    const modulo = cups.length
    const idxCurrentCup = cups.indexOf(currentCup)

    const triplet = []
    for (let i = 1; i < 4; i++) {
        triplet.push(cups[(idxCurrentCup + i) % modulo])
    }

    return triplet
}

// Input to this function should have the picked up ones removed
function findDestination(currentCup : number, cups : Array<number>) : number {
    let destination = currentCup - 1

    // This should always terminate
    while (cups.indexOf(destination) == -1) {
        destination--
        if (destination < 1) {
            destination = cups.reduce((n1, n2) => Math.max(n1, n2))
        }
    }

    return destination
}

function readInputArray() : string {
    const fs = require('fs')
    const array = fs.readFileSync('test').toString().split("\n")[0].trim()
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input, 100))
}

main()