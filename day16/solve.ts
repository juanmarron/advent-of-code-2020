
function solve(input : Array<string>) : number {
    const yourTicket = input.indexOf("your ticket:")
    const rules = input.slice(0, yourTicket-1).join(" ")
    const validRanges = rules.match(/\d*-\d*/g)

    let validNumbers = new Set()
    validRanges.forEach(e => {
        const start = +e.split("-")[0]
        const end = +e.split("-")[1]

        for (let i = start; i <= end; i++) {
            validNumbers.add(i)
        }
    })
    
    const nearby = input.indexOf("nearby tickets:")
    const nearbyTickets = input.slice(nearby+1)

    let invalidValues = []
    nearbyTickets.forEach(e => {
        const nums = e.split(",")
        for (let i = 0; i < nums.length; i++) {
            if (!validNumbers.has(+nums[i])) {
                invalidValues.push(+nums[i])
            }
        }
    })

    return invalidValues.reduce((n1, n2)=>n1+n2)
}

function solve2(input : Array<string>) : number {
    const yourTicketIdx = input.indexOf("your ticket:")
    const rulesMap = new Map<string, Array<number>>()
    const valuesToRuleName = new Map<number, Array<string>>()
    input.slice(0, yourTicketIdx-1).forEach((x) => {
        const ruleName = x.split(":")[0]
        const ranges = x.match(/\d*-\d*/g)

        const validValues = []
        ranges.forEach(r => {
            const start = +r.split("-")[0]
            const end = +r.split("-")[1]

            for (let i = start; i <= end; i++) {
                validValues.push(+i)
            }
        })

        rulesMap.set(ruleName, validValues)

        validValues.forEach(v => {
            if (valuesToRuleName.has(v)) {
                valuesToRuleName.set(v, valuesToRuleName.get(v).concat(ruleName))
            } else {
                valuesToRuleName.set(v, [ruleName])
            }
        })
    })

    let allValidValues = []
    rulesMap.forEach((v,k) => {
        allValidValues = allValidValues.concat(v)
    })
    
    const nearby = input.indexOf("nearby tickets:")
    const validNearbyTickets = input.slice(nearby+1).filter(e => {
        const nums = e.split(",")
        for (let i = 0; i < nums.length; i++) {
            if (!allValidValues.includes(+nums[i])) {
                return false
            }
        }
        return true
    })

    const numRules = validNearbyTickets[0].split(",").length
    let rulesSeen = []
    let idxToRuleMap = new Map<number, string>()
    // iterate until it converges
    while (rulesSeen.length != numRules) {
        for (let i = 0; i < numRules; i++) {
            const valuesAtIndex = validNearbyTickets.map(e => +e.split(",")[i])
            const possibleRules = valuesAtIndex.map(e => valuesToRuleName.get(e)).map(e => {
                rulesSeen.forEach(r=> {
                    const idx = e.indexOf(r)
                    if (idx > -1) {
                        e.splice(idx, 1);
                    }
                })
                
                return e
            })
            let intersection = possibleRules.reduce((r1,r2) => { return r1.filter(x => r2.includes(x))})
            if (intersection.length === 1) {
                idxToRuleMap.set(i, intersection[0])
                rulesSeen.push(intersection[0])
            }
        }
    }

    const yourTicket = input[yourTicketIdx+1]

    return yourTicket.split(",").map(x=>+x).map((e,idx) => {
        const rule = idxToRuleMap.get(idx)
        if (rule.match(/departure/g)) {
            return e
        }

        return 1
    }).reduce((n1, n2) => n1*n2)
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input))
    console.log(solve2(input))
}

main()