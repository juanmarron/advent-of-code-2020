import {cloneDeep} from 'lodash';

enum Cardinal {
    EAST = "EAST",
    WEST = "WEST",
    NORTH = "NORTH",
    SOUTH = "SOUTH"
}

interface Position {
    x: number,
    y: number
}

// Array for figuring out rotation. Each direction is 90 clockwise of the previous
const cardinals = [Cardinal.EAST, Cardinal.SOUTH, Cardinal.WEST, Cardinal.NORTH]

// ugh I'm sure there's a smarter way of doing it than enumerating the possibilities
// maps quadrants to [x,y] signs. basically determines which axis to reflect upon
const nextQuadrantSign = {
    1: {
        "R": {
            x: 1,
            y: -1
        },
        "L": {
            x: -1,
            y: 1
        }
    },
    2: {
        "R": {
            x: -1,
            y: -1
        },
        "L": {
            x: 1,
            y: 1
        }
    },
    3: {
        "R": {
            x: -1,
            y: 1
        },
        "L": {
            x: 1,
            y: -1
        }
    },
    4: {
        "R": {
            x: 1,
            y: 1
        },
        "L": {
            x: -1,
            y: -1
        }
    }
}

function solve(inp : Array<string>) : number {
    let forward = Cardinal.EAST
    let shipPosition = {
        x: 0,
        y: 0
    }

    inp.forEach(e => {
        let dir = e.charAt(0)
        let num = +e.slice(1)

        switch (dir) {
            case 'N': {
                shipPosition.y += num
                break
            }
            case 'S': {
                shipPosition.y += -num
                break
            }
            case 'E': {
                shipPosition.x += num
                break
            }
            case 'W': {
                shipPosition.x += -num
                break
            }
            case 'L': {
                forward = getNewDirection(forward, dir, num)
                break
            }
            case 'R': {
                forward = getNewDirection(forward, dir, num)
                break
            }
            case 'F': {
                switch (forward) {
                    case Cardinal.NORTH: {
                        shipPosition.y += num
                        break
                    }
                    case Cardinal.SOUTH: {
                        shipPosition.y += -num
                        break
                    }
                    case Cardinal.EAST: {
                        shipPosition.x += num
                        break
                    }
                    case Cardinal.WEST: {
                        shipPosition.x += -num
                        break
                    }
                }
            }
        }
    })
    
    return Math.abs(shipPosition.x) + Math.abs(shipPosition.y)
}

function solve2(inp : Array<string>) : number {
    let shipPosition = {
        x: 0,
        y: 0
    }
    let waypointOffset = {
        x: 10,
        y: 1
    }

    inp.forEach(e => {
        let dir = e.charAt(0)
        let num = +e.slice(1)

        console.log(waypointOffset.x, waypointOffset.y)
        switch (dir) {
            case 'N': {
                waypointOffset.y += num
                break
            }
            case 'S': {
                waypointOffset.y += -num
                break
            }
            case 'E': {
                waypointOffset.x += num
                break
            }
            case 'W': {
                waypointOffset.x += -num
                break
            }
            case 'L': {
                waypointOffset = rotateWaypoint(waypointOffset, dir, num);
                break
            }
            case 'R': {
                waypointOffset = rotateWaypoint(waypointOffset, dir, num);
                break
            }
            case 'F': {
                shipPosition = {
                    x: shipPosition.x + (waypointOffset.x * num),
                    y: shipPosition.y + (waypointOffset.y * num),
                }
            }
        }
    })
    
    return Math.abs(shipPosition.x) + Math.abs(shipPosition.y)
}

// returns new waypoint offset.
function rotateWaypoint(waypointOffset : Position, rotation : string, degrees) : Position {
    if (degrees === 0) {
        return waypointOffset
    } else if (degrees === 180) {
        return {
            x: waypointOffset.x * -1,
            y: waypointOffset.y * -1
        }
    } else if (degrees === 270) {
        if (rotation === "R") {
            rotation = "L"
        } else {
            rotation = "R"
        }
        degrees = 90
    }

    const quadrant = (x,y) => {
        if (x >= 0 && y >= 0) {
            return 1
        } else if (x >= 0 && y < 0) {
            return 2
        } else if (x < 0 && y < 0) {
            return 3
        } else if (x < 0 && y >= 0) {
            return 4
        }
    }

    const sign = nextQuadrantSign[quadrant(waypointOffset.x, waypointOffset.y)][rotation]
    return {
        x: Math.abs(waypointOffset.y)*sign.x,
        y: Math.abs(waypointOffset.x)*sign.y,
    }
}

function getNewDirection(forward : Cardinal, rotation : string, degrees : number) : Cardinal {
    const curr = cardinals.indexOf(forward)
    
    // degrees in data set are [90, 180, 270]
    let index
    if (rotation === 'R') {
        index = (degrees/90 + curr)%4
    } else {
        index = (curr + 4 - degrees/90)%4
    }
    
    return cardinals[index]
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    const solved = solve(input)
    console.log(solved)
    console.log(solve2(input))
}

main()