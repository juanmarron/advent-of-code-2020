import { exception } from "console"

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
    
    if (expression.charAt(0) === "(") {
        return evaluateExpression(expression.slice(1, expression.lastIndexOf(")")))
    }

    if (expression.length === 1) {
        // this should be anumber because it's not a parenthesis
        return +expression.charAt(0)
    }

    const operator = expression.charAt(1)
    switch (operator) {
        case '+': {
            return +expression.charAt(0) + evaluateExpression(expression.slice(2))
        }
        case '-': {
            return +expression.charAt(0) - evaluateExpression(expression.slice(2))
        }
        case '*': {
            return +expression.charAt(0) * evaluateExpression(expression.slice(2))
        }
        case '/': {
            return +expression.charAt(0) / evaluateExpression(expression.slice(2))
        }
        default: {
            throw new Error(`${operator} is not an operator`)
        }
    }
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('test').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input))
}

main()