
enum Side {
    LEFT,
    RIGHT,
    ABOVE,
    BELOW
}

const sideEnums = [Side.LEFT, Side.RIGHT, Side.ABOVE, Side.BELOW]

class Tile {
    id: number
    grid: Array<Array<string>>
    adjacentTileIds: Map<Side, Tile>
    
    constructor() {
        this.adjacentTileIds = new Map()
    }

    getAllSides() : Array<Array<String>> {
        const sides = []
        sideEnums.forEach(e => {
            const c = this.getSide(e)
            if (this.id === 1171) {
                // console.log(c)
            }
            sides.push(c)
        })
        
        return sides
    }
    
    getSide(direction : Side) : Array<string> {
        const length = this.grid.length;
        const width = this.grid[0].length;
        
        switch (direction) {
            case Side.LEFT: {
                const ret = []
                for (let i = 0; i < length; i++) {
                    ret.push(this.grid[i][0])
                }
                return ret
            }
            case Side.RIGHT: {
                const ret = []
                for (let i = 0; i < length; i++) {
                    ret.push(this.grid[i][width-1])
                }
                return ret
            }
            case Side.ABOVE: {
                return this.grid[0]
            }
            case Side.BELOW: {
                return this.grid[length - 1]
            }
        }
    }
}

function solve(tiles : Array<Tile>) : number {
    
    tiles.forEach(t => {
        sideEnums.forEach(s => {
            const matchingTile = findMatchingTile(t.id, t.getSide(s), tiles)
            if (matchingTile) {
                // for data integrity I should do this at the same time on the matchingTile but that's harder
                t.adjacentTileIds.set(s, matchingTile)
            }
        })
    })

    return tiles.filter(t => t.adjacentTileIds.size === 2).map(t => t.id).reduce((n1,n2) => n1*n2)
}

function findMatchingTile(tileId : number, side : Array<String>, tiles : Array<Tile>) : Tile {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].id === tileId) {
            continue
        }

        if (includes(side, tiles[i].getAllSides())) {
            return tiles[i]
        }
    }
}

// includes reversals
function includes(side : Array<String>, sides : Array<Array<String>>) : boolean {
    const stringedSide = JSON.stringify(side)
    const reversedSide = JSON.stringify(side.slice().reverse())
    for (let i = 0; i < sides.length; i ++) {
        const element = JSON.stringify(sides[i])
        if (element === stringedSide || element === reversedSide) {
            return true
        }
    }
    return false
}

// Eh not super proud of this parser
function parseToTiles(input : Array<string>) : Array<Tile> {
    const tiles = []

    let currentTile : Tile = new Tile()
    currentTile.id = getId(input[0])
    for (let i = 1; i < input.length; i++) {
        // skip empty lines.
        if (!input[i]) {
            continue
        }
        if (input[i].startsWith("Tile")) {
            tiles.push(currentTile)
            currentTile = new Tile()
            currentTile.id = getId(input[i])
        } else {
            if (currentTile.grid) {
                currentTile.grid.push(input[i].split(''))
            } else {
                currentTile.grid = [input[i].split('')]
            }
        }
    }
    tiles.push(currentTile)

    return tiles
}

function getId(s : string) : number {
    return +s.split(" ")[1].split(":")[0]
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(parseToTiles(input)))
}

main()