import {cloneDeep} from 'lodash';

interface Position {
    x:number,
    y:number,
    z:number
}

interface Grid3Dimensions {
    crossSections: [{
        grid: Array<Array<number>>,
        zPosition: number
    }]
}

function solve(input : Array<Array<string>>) : number {

    let grid3d = {
        crossSections: [{
            grid: cloneDeep(input),
            zPosition: 0
        }]
    }
    console.log(grid3d)

    grid3d.crossSections.forEach(cube => {


    })

    return 0
}

function findNeighbors3d (pos : Position, grid : Grid3Dimensions) {

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
    console.log(solve(input))
}

main()