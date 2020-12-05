
function solve(forest: Array<Array<string>>, right : number, down : number) : number {
    const length = forest.length
    const width = forest[0].length

    const pos = [0, 0]
    let numTrees = 0

    while (pos[0] < length) {
        if (forest[pos[0]][pos[1]] === '#') {
            numTrees++
        }
        pos[1] = (pos[1] + right) % width
        pos[0] += down
    }

    return numTrees
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
    console.log(solve(input, 3, 1))
    console.log(solve(input, 1, 1) * solve(input, 3, 1) * solve(input, 5, 1) * solve(input, 7, 1) * solve(input, 1, 2))
}

main()