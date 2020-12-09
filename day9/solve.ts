
function solve(input : Array<number>, preamble : number) : number {

    for (let i = preamble; i < input.length; i++) { 
        const prior = input.slice(i - preamble, i)

        if (!sumExists(prior, input[i])) {
            return input[i]
        }
    }

    return -1
}

function contiguous(numbers : Array<number>, addUpTo : number) : number {

    let left = 0
    let right = 1

    while (sum(numbers.slice(left, right)) !== addUpTo) {
        if (sum(numbers.slice(left, right)) < addUpTo) {
            right += 1
        } else {
            left += 1
        }
    }

    const contiguousArray = numbers.slice(left, right)
    contiguousArray.sort((n1,n2) => n1 - n2)

    return contiguousArray[0] + contiguousArray[contiguousArray.length-1]
}

function sum(numbers : Array<number>) : number {
    console.log(numbers)
    return numbers.reduce((n1, n2) => n1 + n2)
}

function sumExists(numbers : Array<number>, addUpTo : number) : boolean {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === addUpTo) {
                return true
            }
        }
    }

}
function readInputArray() : Array<number> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n").map(e => +e)
    return array
}

function main() {
    const input = readInputArray()
    console.log(contiguous(input, 15353384))
}

main()