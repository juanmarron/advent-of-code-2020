
function solve(lines : Array<string>) : Array<number> {
    
    let seatIds = []
    lines.forEach(line => {
        let low = 0
        let high = 127

        let seatLow = 0
        let seatHigh = 7
        line.split('').forEach(c => {
            const mid = (high-low)/2 + low
            const seatMid = (seatHigh - seatLow)/2 + seatLow
            if (c === 'F') {
                high = Math.floor(mid)
            } else if (c === 'B') {
                low = Math.ceil(mid)
            }

            if (c === 'L') {
                seatHigh = Math.floor(seatMid)
            } else if (c === 'R') {
                seatLow = Math.ceil(seatMid)
            }
        })

        let row
        if (line.charAt(6) === 'F') {
            row = low
        } else {
            row =  high
        }

        let seat
        if (line.charAt(9) === 'L') {
            seat = seatLow
        } else {
            seat = seatHigh
        }

        seatIds.push(computeSeatId(row, seat))
    })

    return seatIds
}

function part2(seatIds : Array<number>) : number {
    seatIds.sort((n1,n2) => n1 - n2)
    // const max = Math.max(...seatIds)
    // const min = Math.min(...seatIds)

    let mySeatId = 0
    
    seatIds.forEach((e, idx) => {
        const diff = e - seatIds[idx-1]
        if (diff > 1) {
            mySeatId = e - 1
            return
        }
    })

    return mySeatId
}

function computeSeatId(row : number, seat : number) : number {
    return (row * 8) + seat
}


function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log("Answer 1: " + Math.max(...solve(input)))
    console.log(part2(solve(input)))
}

main()