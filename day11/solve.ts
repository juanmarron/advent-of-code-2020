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

    let oldLayout = seatLayout
    let newLayout = cloneDeep(oldLayout)
    let iterations = 0
    let diff = false
    do {
        diff = false
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                const pos = {
                    x: j,
                    y: i
                }
                if (oldLayout[i][j] === '.') {
                    newLayout[i][j] = '.'
                } else {
                    const occSeats = adjacentOccupiedSeatsImmediate(oldLayout, pos)
                    if (occSeats === 0) {
                        newLayout[i][j] = '#'
                        if (oldLayout[i][j] !== '#') {
                            diff = true
                        }
                    }  if (occSeats > 3) {
                        newLayout[i][j] = 'L'
                        if (oldLayout[i][j] !== 'L') {
                            diff = true
                        }
                    }
                }
            }
        }

        oldLayout = newLayout
        newLayout = cloneDeep(oldLayout)
        iterations++
    } while (diff)
    console.log(`took ${iterations} iters to stabilize`)

    return howManyOccupiedSeats(newLayout)
}

function solve2(seatLayout : Array<Array<string>>) : number {
    const length = seatLayout.length
    const width = seatLayout[0].length

    let oldLayout = seatLayout
    let newLayout = cloneDeep(oldLayout)
    let iterations = 0
    let diff = false
    do {
        diff = false
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < width; j++) {
                const pos = {
                    x: j,
                    y: i
                }
                if (oldLayout[i][j] === '.') {
                    newLayout[i][j] = '.'
                } else {
                    const occSeats = adjacentOccupiedSeatsSkipFloor(oldLayout, pos)
                    if (occSeats === 0) {
                        newLayout[i][j] = '#'
                        if (oldLayout[i][j] !== '#') {
                            diff = true
                        }
                    }  if (occSeats > 4) {
                        newLayout[i][j] = 'L'
                        if (oldLayout[i][j] !== 'L') {
                            diff = true
                        }
                    }
                }
            }
        }

        oldLayout = newLayout
        newLayout = cloneDeep(oldLayout)
        iterations++
    } while (diff)
    console.log(`took ${iterations} iters to stabilize`)

    return howManyOccupiedSeats(newLayout)
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
        const xOffset = position.x + directions[i][0]
        const yOffset = position.y + directions[i][1]
        if (seatLayout[yOffset] && seatLayout[yOffset][xOffset]) {
            const adjSeat = seatLayout[yOffset][xOffset]
            if (adjSeat === '#') {
                adjacents++
            }
        }
    }

    return adjacents
}

function adjacentOccupiedSeatsSkipFloor(seatLayout : Array<Array<string>>, position : Seat) : number {
    let adjacents = 0

    for (let i = 0; i < directions.length; i++) {
        if (directionHasOccupiedSeatSkippingFloor(seatLayout, position, directions[i])) {
            adjacents++
        }
    }

    return adjacents
}

function directionHasOccupiedSeatSkippingFloor(seatLayout : Array<Array<string>>, position : Seat, direction : Array<number>) : boolean {
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
    let begin = new Date().getTime()
    const solved = solve(input)
    console.log(solved)
    let end = new Date().getTime()
    console.log("time: " + (end-begin))
    
    begin = new Date().getTime()
    console.log(solve2(input))
    end = new Date().getTime()

    console.log("time: " + (end-begin))
}

main()