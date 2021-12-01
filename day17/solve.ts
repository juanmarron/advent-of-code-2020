import {cloneDeep} from 'lodash';

const directions = permutations3d()

interface Position {
    x:number,
    y:number,
    z:number
}

function solve(initialGrid : Array<Array<Array<string>>>, iterations : number) : number {
    let grid : Array<Array<Array<string>>> = padGrid(cloneDeep(initialGrid))
    let newGrid = cloneDeep(grid)

    for (let i = 0; i < iterations; i++) {
        for (let z = 0; z < grid.length; z++) {
            for (let y = 0; y < grid[z].length; y++) {
                for (let x = 0; x < grid[z][y].length; x++) {
                    const position = {
                        x: x,
                        y: y,
                        z: z
                    }
                    const currCubeIsActive = grid[z][y][x] === "#"
                    const activeNeighbors = countActiveNeighbors(position, grid)
                    if ((activeNeighbors === 2 || activeNeighbors === 3) && currCubeIsActive) {
                        newGrid[z][y][x] = "#"
                    } else if (activeNeighbors === 3 && !currCubeIsActive) {
                        newGrid[z][y][x] = "#"
                    } else {
                        newGrid[z][y][x] = "."
                    }
                }
            }
        }
        
        grid = padGrid(cloneDeep(newGrid))
        newGrid = cloneDeep(grid)
    }

    return countHashes(newGrid)
}

function permutations3d() : Array<Array<number>> {
    const perms = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            for (let n = -1; n <= 1; n++) {
                if (!(i === 0 && j === 0 && n === 0)) {
                    perms.push([i,j,n])
                }
            }
        }
    }
    return perms
}

function countHashes(grid: Array<Array<Array<string>>>) : number {

    let hashes = 0
    grid.forEach(z => {
        z.forEach(y => {
            y.forEach(x => {
                if (x === "#") {
                    hashes++
                }
            })
        })
    })

    return hashes
}

// Add empty space around it
function padGrid(grid : Array<Array<Array<string>>>) {
    const retVal = cloneDeep(grid)
    const z = grid.length
    const y = grid[0].length
    const x = grid[0][0].length

    // empty row vector
    const rowVec = []
    for (let r = 0; r < x+2; r++) {
        rowVec.push(".")
    }

    for (let n = 0; n < z; n++) {
        // I had the absolute worse time debugging this.
        // For whatever reason, when this ran with 3 planes, the reference to the first plane was the same as the reference to the 3rd plane,
        // which means that push and unshift were operating on something that had already been pushed/unshifted.
        // I don't fully understand how on earth that was happening; at any rate, that is why I use cloneDeep. It generates a completely new reference and the problem went away.
        const newPlane = cloneDeep(retVal[n])
        for (let i = 0; i < y; i++) {
            newPlane[i].push(".")
            newPlane[i].unshift(".")
        }
        retVal[n] = newPlane
    }

    for (let i = 0; i < z; i++) {
        retVal[i].unshift(cloneDeep(rowVec))
        retVal[i].push(cloneDeep(rowVec))
    }

    const emptyGrid2d = []
    for (let i = 0; i < y+2; i++) {
        emptyGrid2d.push(cloneDeep(rowVec))
    }

    // Add empty planes before and after for z-values
    retVal.unshift(emptyGrid2d)
    retVal.push(emptyGrid2d)

    return retVal
}

function countActiveNeighbors(pos : Position, grid : Array<Array<Array<string>>>) : number {

    let active = 0

    for (let i = 0; i < directions.length; i++) {
        const newZ = pos.z + directions[i][2]
        const newY = pos.y + directions[i][1]
        const newX = pos.x + directions[i][0]

        if (grid[newZ]?.[newY]?.[newX] === "#") {
            active++
        }
    }

    return active
}

function readInputArray() : Array<Array<Array<string>>> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n").map((e: string) => {
        return e.split('')
    })
    return [array]
}

function main() {
    const input = readInputArray()
    console.log(solve(input, 6))
}

main()