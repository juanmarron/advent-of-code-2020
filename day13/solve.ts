import { match } from "assert"

interface Bus {
    id: number,
    timeOffset: number
}

function solve(input : Array<string>) : number {

    const time = +input[0]
    const buses = input[1].split(",").filter(e => e !== "x").map(x => +x)
    console.log(buses)

    // could be cleaner
    const diffs = new Map()
    let min
    let busId
    buses.forEach(b => {
        const diff =  b - (time % b)

        if (!min || diff < min) {
            min = diff
            busId = b
        }
    })

    return busId * min
}

function solve2(busIds : Array<string>) : number {
    console.log(busIds)

    let buses = []

    busIds.forEach((b,idx) => {
        if (b !== "x") {
            const bus = {
                id: +b,
                timeOffset: idx
            }
            buses.push(bus)
        }
    })

    let timestamp = buses[0].id

    let increment = 1
    while (buses.length > 0) {
        // This only works because the busIds are prime, which I only realized after a stressful 2 hours trying to implement the chinese remainder theorem...
        if (isValidTimestamp(buses[0], timestamp)) {
            increment *= buses[0].id
            buses = buses.slice(1)
        } else {
            timestamp += increment 
        }
    }

    return timestamp
}

function isValidTimestamp(bus : Bus, timestamp : number) {
    if ((timestamp + bus.timeOffset) % bus.id === 0) {
        return true
    }

    return false
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input))
    const buses = input[1].split(",")
    console.log(solve2(buses))
}

main()