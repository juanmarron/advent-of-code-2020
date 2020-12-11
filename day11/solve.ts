import { dir } from 'console';
import {cloneDeep} from 'lodash';

// clockwise starting left
const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1]
]

interface Seat {
    x: number,
    y: number
}

function solve(seatLayout : Array<Array<string>>) : number {
    const length = seatLayout.length
    const width = seatLayout[0].length

    let layout = seatLayout
    for (let n = 0; n < 1000; n++) {
    // while (!deepEquality(layout, seatLayout) && layout == seatLayout) {
        const newLayout = cloneDeep(layout);

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                const pos = {
                    x: j,
                    y: i
                }
                const occSeats = adjacentOccupiedSeatsImmediate(layout, pos)
                if (occSeats === 0) {
                    newLayout[i][j] = '#'
                } else if (occSeats > 3) {
                    newLayout[i][j] = 'L'
                }
                if (layout[i][j] === '.') {
                    newLayout[i][j] = '.'
                }
            }
        }

        layout = newLayout
    }

    return howManyOccupiedSeats(layout)
}

function solve2(seatLayout : Array<Array<string>>) : number {
    const length = seatLayout.length
    const width = seatLayout[0].length

    let layout = seatLayout
    for (let n = 0; n < 1000; n++) {
        // Eventually I'd do this right by compaaring the arrays and seeing when they match. But it's late so I just did many iterations to 'guarantee' that they stabilize
    // while (!deepEquality(layout, seatLayout) && layout == seatLayout) {
        const newLayout = cloneDeep(layout);

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                const pos = {
                    x: j,
                    y: i
                }
                const occSeats = adjacentOccupiedSeatsFarAway(layout, pos)
                if (layout[i][j] === '.') {
                    newLayout[i][j] = '.'
                } else if (occSeats === 0) {
                    newLayout[i][j] = '#'
                } else if (occSeats > 4) {
                    newLayout[i][j] = 'L'
                }
            }
        }

        layout = newLayout
    }

    return howManyOccupiedSeats(layout)
}

function deepEquality(layout1 : Array<Array<string>>, layout2 : Array<Array<string>>) : boolean {
    const length = layout1.length
    const width = layout1[0].length

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            const l1 = layout1[i][j]
            const l2 = layout2[i][j]
            if (l1 !== l2) {
                return false
            }
        }
    }

    return true
}

function howManyOccupiedSeats(seatLayout : Array<Array<string>>) : number {
    const length = seatLayout.length
    const width = seatLayout[0].length

    let numOccupied = 0

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            if (seatLayout[i][j] === '#') {
                numOccupied++
            }
        }
    }

    return numOccupied
}

function adjacentOccupiedSeatsImmediate(seatLayout : Array<Array<string>>, position : Seat) : number {
    let adjacents = 0

    for (let i = 0; i < directions.length; i++) {
        const xOffset = position.y + directions[i][1]
        const yOffset = position.x + directions[i][0]
        if (seatLayout[xOffset] && seatLayout[xOffset][yOffset]) {
            const adjSeat = seatLayout[xOffset][yOffset]
            if (adjSeat === '#') {
                adjacents++
            }
        }
    }

    return adjacents
}

function adjacentOccupiedSeatsFarAway(seatLayout : Array<Array<string>>, position : Seat) : number {
    let adjacents = 0

    for (let i = 0; i < directions.length; i++) {
        if (directionHasOccupiedSeat(seatLayout, position, directions[i])) {
            adjacents++
        }
    }

    return adjacents
}

function directionHasOccupiedSeat(seatLayout : Array<Array<string>>, position : Seat, direction : Array<number>) : boolean {
    let xDir = direction[0]
    let yDir = direction[1]
    let xPos = position.x + xDir
    let yPos = position.y + yDir
    let multiplier = 1

    while (seatLayout[yPos] && seatLayout[yPos][xPos] && seatLayout[yPos][xPos] === '.') {
        xPos = position.x + (xDir * multiplier)
        yPos = position.y + (yDir * multiplier)
        multiplier++
    }

    if (seatLayout[yPos] && seatLayout[yPos][xPos] && seatLayout[yPos][xPos] === "#") {
        return true
    }

    return false
}

function readInputArray() : Array<Array<string>> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n").map((e: string) => {
        return e.split('')
    })    
    return array
}

function main() {
    const input = readInputArray()
    const solved = solve(input)
    console.log(solved)
    console.log(solve2(input))
}

main()