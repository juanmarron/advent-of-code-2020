
// Completely unrelated to advent-of-code but I needed to write a quick script to
// count points for the Ticket to Ride board game and this was open so...

const scoreMap = {
    1: 1,
    2:2,
    3:4,
    4:7,
    5:10,
    6:15
}

// hastily written score counting for trains game.
function countScore(lines : Array<string>) {
    const players = lines[0].split(",")
    const p1NumTrains = lines[1].split(",").map(x => +x)
    const p2NumTrains = lines[2].split(",").map(x => +x)

    const p1Destinations = lines[3]?.split(",").map(x => +x)
    const p2Destinations = lines[4]?.split(",").map(x => +x)

    let p1Score = 0
    p1NumTrains.forEach((e, idx) => {
        p1Score += (e * scoreMap[idx + 1])
    })

    const p1DestScore = p1Destinations.reduce((n1, n2) => n1 + n2)
    p1Score +=  p1DestScore

    let p2Score = 0
    p2NumTrains.forEach((e, idx) => {
        p2Score += (e * scoreMap[idx + 1])
    })
    
    const p2DestScore = p2Destinations.reduce((n1, n2) => n1 + n2)
    p2Score += p2DestScore
    
    console.log(`${players[0]} got ${p1Score}! ${p1DestScore} were from destination cards/longest road`)
    console.log(`${players[1]} got ${p2Score}! ${p2DestScore} were from destination cards/longest road`)
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    countScore(input)
}

main()