import { exception } from "console"

// Did part 1 kinda hackily. For part 2 I'll write a grammar but while I remember how to write grammars, 
// I don't really remember how to convert a formal grammar to an actual tokenizer/parser in code.
function solve(input : Array<string>) : number {
    return input
        .map(x => x.replace(/ /g,''))
        .map(x => evaluateExpression(reverseExpression(x)))
        .reduce((n1, n2) => n1+n2)
}

// Reversing the expression so that my recursive function is cleaner because I am bad at programming
function reverseExpression(expression : string) : string {
    const reversed = expression.split('').reverse()
    const flipParens = []
    reversed.forEach(e => {
        if (e === "(") {
            flipParens.push(")")
        } else if (e === ")") {
            flipParens.push("(")
        } else {
            flipParens.push(e)
        }
    })

    return flipParens.join("")
}

function evaluateExpression(expression : string) : number {
    console.log(expression)
    
    let value
    let operatorIndex = 1
    if (expression.startsWith("(")) {
        const removeFirst = expression.slice(1)
        const matchingParens = findMatchingParens(removeFirst.split(''))
        value = evaluateExpression(removeFirst.slice(0, matchingParens))
        operatorIndex = matchingParens + 2
    } else {
        value = +expression.charAt(0)
    }

    if (expression.length === 1 || operatorIndex === expression.length) {
        // If it's here it can only be a single value or end of expression
        return value
    }

    const operator = expression.charAt(operatorIndex)
    switch (operator) {
        case '+': {
            return value + evaluateExpression(expression.slice(operatorIndex+1))
        }
        case '-': {
            return value - evaluateExpression(expression.slice(operatorIndex+1))
        }
        case '*': {
            return value * evaluateExpression(expression.slice(operatorIndex+1))
        }
        case '/': {
            return value / evaluateExpression(expression.slice(operatorIndex+1))
        }
        default: {
            throw new Error(`${operator} at ${operatorIndex} in ${expression} is not an operator`) 
        }
    }
}

function findMatchingParens(expression : Array<string>) : number {
    let counter = 1

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "(") {
            counter++
        } else if (expression[i] === ")") {
            counter --
        }

        if (counter === 0) {
            return i
        }
    }

    throw new Error("Could not find matching parens")
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input))
    // console.log(findMatchingParens("5*4)+3*2".split('')))
}

main()