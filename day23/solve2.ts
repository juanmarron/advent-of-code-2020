

// I overcomplicated the crap out of this, I should have used a linked list from the beginning :(
// I implemented that with the kotlin solution becuase I got a bit tired of javascript.
function solveEfficiently(input : string, numMoves : number, totalNumbers : number) : number {
    let cups = generateInput(input, totalNumbers)
    let currentCup = cups[0]
    const modulo = cups.length

    // bidirectional map
    const valuesToIdx = {}
    const idxToValues = {}

    cups.forEach((element, idx) => {
        valuesToIdx[element] = idx
        idxToValues[idx] = element
    });

    for (let i = 1; i <= numMoves; i++) {
        if (i % 5000 === 0) {
            console.log(`Processed ${i}`)
        }
        // console.log(`cups: ${backToArray(idxToValues)}`)
        const triplet = get3Clockwise(currentCup, valuesToIdx, idxToValues, totalNumbers)
        const destination = findDestination(currentCup, valuesToIdx, totalNumbers, triplet)

        // this is the super dicey part.
        // Two cases; either the destination is in front, in which case all indexes between curr and dest (inclusive) (excluding triplet) subtract 3
        // If destination is behind, then it's pretty much the same but all indexes between dest and curr (inclusive) add 3
        // add or subtract 3 before you put in the triplet

        if (valuesToIdx[destination] > valuesToIdx[currentCup]) {
            // destination is in front of current cup
            // +4 to skip the 3 that we pulled out
            for (let i = valuesToIdx[currentCup]+4; i <= valuesToIdx[destination]; i++) {
                idxToValues[(i - 3)%modulo] = idxToValues[i]
                valuesToIdx[idxToValues[i]] = (i - 3)%modulo
            }

            triplet.forEach((t, idx) => {
                const destIdx = valuesToIdx[destination]
                idxToValues[(destIdx + idx + 1)%modulo] = t
                valuesToIdx[t] = (destIdx + idx + 1)%modulo
            })
        } else {
            // destination is behind
            // go backwards from currCup
            for (let i = valuesToIdx[currentCup]; i > valuesToIdx[destination]; i--) {
                idxToValues[(i + 3)%modulo] = idxToValues[i]
                valuesToIdx[idxToValues[i]] = (i + 3)%modulo
            }

            triplet.forEach((t, idx) => {
                const destIdx = valuesToIdx[destination]
                idxToValues[(destIdx + idx + 1)%modulo] = t
                valuesToIdx[t] = (destIdx + idx + 1)%modulo
            })
        }
        // console.log(triplet)
        // console.log(currentCup)
        // console.log(destination)

        currentCup = idxToValues[(valuesToIdx[currentCup] + 1) % modulo]
    }

    // for after:
    const idx1 = valuesToIdx[1]
    const clockwise1 = idxToValues[(idx1+1)%modulo]
    const clockwise2 = idxToValues[(idx1+2)%modulo]
    
    // this is the same logic as for part 1 so it's useful for debugging. For the actual answer, use the commented out above stuff.
    // const idx1 = valuesToIdx[1]
    // const ra = backToArray(idxToValues, totalNumbers)
    // const clockwiseAfter1 = ra.slice(idx1+1).concat(ra.slice(0,idx1))

    return clockwise1 * clockwise2
}

function backToArray(idxToValues : {}, totalNumbers : number) : Array<number> {
    const ra = []
    for (let i = 0; i < totalNumbers; i++) {
        ra.push(idxToValues[i])
    }

    return ra
}

function generateInput(initialNumbers : string, totalNumbers : number) : Array<number> {
    let cups = initialNumbers.split('').map(x => +x)
    
    const max = cups.reduce((n1, n2) => Math.max(n1, n2))

    for (let i = max+1; i <= totalNumbers; i++) {
        cups.push(i)
    }

    return cups
}

function get3Clockwise(currentCup : number, valuesToIdx : {}, idxToValues : {}, numTotalValues : number) : Array<number> {
    const currIdx = valuesToIdx[currentCup]

    const triplet = []
    for (let i = 1; i < 4; i++) {
        triplet.push(idxToValues[(currIdx + i) % numTotalValues]) 
    }
    
    return triplet
}

function findDestination(currentCup : number, valuesToIdx : {}, max : number, ignore : Array<number>) : number {
    let destination = currentCup - 1

    while (ignore.includes(destination) || valuesToIdx[destination] === undefined) {
        destination--
        if (destination < 1) {
            destination =  max
        }
    }

    return destination
}

function readInputArray() : string {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")[0].trim()
    return array
}

function main() {
    const input = readInputArray()
    console.profile
    console.log(solveEfficiently(input, 10000000, 1000000))
}

main()