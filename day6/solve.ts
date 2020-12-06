
function solve(customs : Array<string>) : Array<number> {

    let counts = []

    customs.forEach(c => {
        counts.push(new Set(c.replace(/ /g, "").split('')).size)
    })

    return counts
}

function solve2(customs : Array<string>) : Array<number> {
    // everyone answering yes

    let counts = []

    customs.forEach(c => {
        let each = c.split(" ")

        let bits = each.map(e => {
            let sorted = e.split('').sort()
            let index = sorted.map(e => { return e.charCodeAt(0) % 97 })
            let bloom = new Array<string>(26).fill("0").map((e, idx) => { 
                if (index.includes(idx)) {
                    return "1"
                }
            })
            return bloom.reduce((n1, n2) => {
                if (n1 && n2) {
                    return n1 + n2
                } else if (n1) {
                    return n1 + "0"
                } else if (n2) {
                    return "0" + n2
                } else {
                    return "00"
                }
            })
        })
        console.log(bits)
        let reduced = bits.reduce((n1, n2) => (parseInt(n1, 2) & parseInt(n2, 2)).toString(2)).split('').reduce((n1, n2) => (+n1 + +n2).toString())
        console.log(reduced)
        counts.push(reduced)
    })

    return counts
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n\n").map(e => e.replace(/\n/g, " "))
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input).reduce((n1, n2) => n1 + n2))
    console.log(solve2(input).reduce((n1, n2) => +n1 + +n2))
}

main()