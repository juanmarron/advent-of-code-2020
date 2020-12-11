
function solve(input : Array<number>) : Array<number> {
    input.sort((n1, n2) => n1 - n2);

    let diff1 = 0
    let diff3 = 0
    for (let i = 1; i < input.length; i++) {
        const diff = input[i] - input[i-1]
        if (diff === 1) {
            diff1++
        } else if (diff === 3) {
            diff3++
        }

    }
    
    // +1 for built in adapter
    return [diff1 + 1, diff3 + 1]
}

function solve2(input : Array<number>) : number {
    input.sort((n1, n2) => n1 - n2);

    // basically cant remove a value if it leads to a gap of >3 in the array
    const cantRemove = []
    for (let i = 0; i < input.length; i++) {
        let prior = input[i-1]
        if (!prior) {
            prior = 0
        }
        let next = input[i+1]
        if (!next) {
            next = input[i] + 3
        }
        const diffIfRemoved = next - prior
        if (diffIfRemoved > 3) {
            cantRemove.push(input[i])
        }
    }

    let canRemove = []
    input.forEach((e) => {
        if (cantRemove.indexOf(e) === -1) {
            canRemove.push(e)
        }
    })

    // map of length -> count
    const contiguousStretches = new Map<number,number>()

    let currentContiguousLength = 1
    for (let i = 1; i < canRemove.length; i++) {
        const prior = canRemove[i-1]

        if (canRemove[i] - prior === 1) {
            currentContiguousLength++
        } else {
            incrementValue(contiguousStretches, currentContiguousLength)
            currentContiguousLength = 1
        }
    }
    incrementValue(contiguousStretches, currentContiguousLength)
    
    /* from the set of things you can remove, it goes:
    if 1, there's 2 combos, leave it or remove it
    if 2, there's 4 combos: drop both, either or, or neither.
    etc.
    if 4 it's 10, you can't drop all of them because you'd create a gap of >3.
    */
    let combos = 1
    contiguousStretches.forEach((v,k) => {
        if (k === 1) {
            combos *= 2**v
        }
        if (k === 2) {
            combos *= (4**v)
        }
        if (k === 3) {
            combos *= (7**v)
        }
        if (k === 4) {
            combos *= (10**v)
        }
        // I could write a function that generates the next multipliers for any values of k but it wasn't worth it since there's no contiguous stretches longer than 4
        // I think it's just +3 for each one from here from what I've seen but I haven't thoroughly tested
    })

    return combos
}

function incrementValue(map : Map<number, number>, def : number) {
    // yeah I'm modifying the parameter directly...sue me
    if (map.has(def)) {
        map.set(def, map.get(def) + 1) 
    } else {
        map.set(def, 1)
    }
}

function readInputArray() : Array<number> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n").map(e => +e)
    return array
}

function main() {
    const input = readInputArray()
    // const solved = solve(input)
    // console.log(solved[0] * solved[1])
    console.log(solve2(input))
}

main()