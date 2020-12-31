
enum Side {
    e = "e",
    se = "se",
    sw = "sw",
    w = "w",
    nw = "nw",
    ne = "ne"
}

// Somehow, when I called this Position it was expecting a different Position type from somewhere else
// Not sure how to specify in TS that I wanted this one instead of the other so I just renamed it.
interface TilePosition {
    x: number,
    y: number,
}

function solve(input : Array<string>) : number {
    // maybe there's a way to chain all these calls idk
   return countBlackTiles(aggregate(input
            .map(e => tokenizeInput(e))
            .map(e => findTile(e))))
}

// I'll get around to part 2 later
// Probably the best way to do this is to iterate over the black tiles, apply the rules for whether or not
// to flip them, then find neighbors, and recursively call the method for each neighbor.
function solve2() {

}

function aggregate(tiles : Array<TilePosition>) : Map<string, number> {
    const map = new Map<string, number>()
    tiles.forEach(e => {
        const key = JSON.stringify(e)
        if (map.has(key)) {
            const prevVal = map.get(key)
            map.set(key, prevVal + 1)
        } else {
            map.set(key, 1)
        }
    })
    
    return map
}

function countBlackTiles(positions : Map<string, number>) : number {
    const values = []
    positions.entries

    // TODO: I really need to figure out how to use iterators to chain calls
    // I can do forEach but that's not good for chaining calls, and .values()/.keys() uses iterators which also aren't good for chaining calls
    positions.forEach((v,k) => {
        values.push(v)
    })

    return values.filter(e => +e%2 !== 0).length
}

function findTile(directions : Array<Side>) : TilePosition {
    let currentPosition = {
        x: 0,
        y: 0,
    }
    directions.forEach(element => {
        switch (element) {
            case Side.e: {
                currentPosition.x += 1
                break
            }
            case Side.se: {
                currentPosition.x += .5
                currentPosition.y -= 1
                break
            }
            case Side.sw: {
                currentPosition.x -= .5
                currentPosition.y -= 1
                break
            }
            case Side.w: {
                currentPosition.x -= 1
                break
            }
            case Side.nw: {
                currentPosition.x -= .5
                currentPosition.y += 1
                break
            }
            case Side.ne: {
                currentPosition.x += .5
                currentPosition.y += 1
                break
            }
        }
    })

    return currentPosition
}


function tokenizeInput(input : string) : Array<Side> {
    const ra = input.split('')
    const sides = []

    for (let i = 0; i < ra.length; i++) {
        let direction = ra[i]
        let prev = ra[i-1]
        if (!prev || (prev && prev !== "s" && prev !== "n")) {
            switch (direction) {
                case 'e': {
                    sides.push(Side.e)
                    break
                }
                case 'w': {
                    sides.push(Side.w)
                    break
                }
            }
        } else {
            direction = prev + direction
            switch (direction) {
                case 'se': {
                    sides.push(Side.se)
                    break
                }
                case 'sw': {
                    sides.push(Side.sw)
                    break
                }
                case 'ne': {
                    sides.push(Side.ne)
                    break
                }
                case 'nw': {
                    sides.push(Side.nw)
                    break
                }
            }
            prev = undefined
        }
    }
    
    return sides
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