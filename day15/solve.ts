
// This is interesting.
// Using the Map class, this runs in a few seconds.
// Using javascript dicts {}, this grinds to a crawl at around 15000000 items and I'm not sure it'd finish.
// Not sure what the {} is doing
function solve(input : Array<number>, numberToSpeakTo : number) : number {

    const numbersSpoken = new Map<number, Array<number>>()

    input.forEach((e,idx) => {
        numbersSpoken.set(e, [idx])
    })

    let count = input.length
    let last = input[input.length-1]
    while (count < numberToSpeakTo) {
        if (count % 5000 === 0) {
            console.log(`processed ${count}`)
        }
        let lastSpokenIndices = numbersSpoken.get(last)
        
        if (lastSpokenIndices.length > 1) {
            const diff = lastSpokenIndices[lastSpokenIndices.length-1] - lastSpokenIndices[lastSpokenIndices.length-2]
            last = diff
            
            if (!numbersSpoken.has(last)) {
                numbersSpoken.set(last, [count])
            } else {
                numbersSpoken.get(last).push(count)
                const size = numbersSpoken.get(last).length
                numbersSpoken.set(last, numbersSpoken.get(last).slice(size-2, size))
            }
        } else {
            last = 0
            if (!numbersSpoken.has(0)) {
                numbersSpoken.set(0, [count])
            } else {
                numbersSpoken.get(0).push(count)
                const size = numbersSpoken.get(0).length
                numbersSpoken.set(0, numbersSpoken.get(0).slice(size-2, size))
            }
        }
        count++
    }

    return last
}

function readInputArray() : Array<number> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")[0].split(",").map(x => +x)
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input, 30000000))
}

main()