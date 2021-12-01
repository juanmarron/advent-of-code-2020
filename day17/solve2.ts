import {cloneDeep} from 'lodash';

const directions = permutations4d()

interface Position {
    x:number,
    y:number,
    z:number,
    w:number
}

// For part2, I didn't extend my solution from part 1 because it was a terrible solution and I had a hard time visualizing the 4d array, so I ditched that option altogether.

function solve(initialGrid : Array<Array<string>>, iterations : number) : number {
    // using string because js doesn't support object equality for hash sets (that I know of)
    const oldActivePositions = new Set<string>()
    const newActivePositions = new Set<string>()
    // initialize these to the active positions

    let grid  = cloneDeep(initialGrid)
    let newGrid = cloneDeep(grid)

    for (let i = 0; i < iterations; i++) {
        oldActivePositions.forEach(p => {
            const neighbors = findNeighbors(JSON.parse(p))
            const activeNeighbors = neighbors.map(e => JSON.stringify(e)).filter(e => oldActivePositions.has(e))
            
            if (activeNeighbors.length === 2 || activeNeighbors.length === 3) {
                newActivePositions.add(p)
            }

            const inActiveNeighbors = neighbors.map(e => JSON.stringify(e)).filter(e => !oldActivePositions.has(e))
                //                 newGrid[z][y][x][w] = "#"
                //             } else if (activeNeighbors === 3 && !currCubeIsActive) {
                //                 newGrid[z][y][x][w] = "#"
                //             } else {
                //                 newGrid[z][y][x][w] = "."
                //             }
            // change state of current position
            // forEach neighbor
            //  do the same thing. I think we only need one layer of duplication, recursion is overkill
        })
        
    }

    return newActivePositions.size
}

function permutations4d() : Array<Array<number>> {
    const perms = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            for (let n = -1; n <= 1; n++) {
                for (let m = -1; m <= 1; m++) {
                    if (!(i === 0 && j === 0 && n === 0 && m === 0)) {
                        perms.push([i,j,n,m])
                    }
                }
            }
        }
    }
    return perms
}

function countHashes(grid: Array<Array<Array<Array<string>>>>) : number {

    let hashes = 0
    grid.forEach(z => {
        z.forEach(y => {
            y.forEach(x => {
                x.forEach(w => {
                    if (w === "#") {
                        hashes++
                    }
                })
            })
        })
    })

    return hashes
}

function findNeighbors(pos : Position) : Array<Position> {
    const neighbors = []
    
    for (let i = 0; i < directions.length; i++) {
        const newZ = pos.z + directions[i][3]
        const newY = pos.y + directions[i][2]
        const newX = pos.x + directions[i][1]
        const newW = pos.w + directions[i][0]

        neighbors.push({
            x: newX,
            y: newY,
            z: newZ,
            w: newW
        }) 
    }

    return neighbors
}

function countActiveNeighbors(pos : Position, grid : Array<Array<Array<Array<string>>>>) : number {

    let active = 0

    for (let i = 0; i < directions.length; i++) {
        const newZ = pos.z + directions[i][3]
        const newY = pos.y + directions[i][2]
        const newX = pos.x + directions[i][1]
        const newW = pos.w + directions[i][0]

        if (grid[newZ]?.[newY]?.[newX]?.[newW] === "#") {
            active++
        }
    }

    return active
}

function readInputArray() : Array<Array<string>> {
    const fs = require('fs')
    const array = fs.readFileSync('test').toString().split("\n").map((e: string) => {
        return e.split('')
    })
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input, 1))
}

main()