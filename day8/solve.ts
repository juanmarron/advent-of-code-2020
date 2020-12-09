
interface Command {
    cmd: string
    value: number
}

function solve(input : Array<string>) : number {
    const commands = input.map(e => parseCommand(e))
    const jmpIdxes = commands.map((e, idx) => {
        if (e.cmd === "jmp") {
            return idx
        }
    }).filter(e => e)

    const nop = {
        cmd: "nop",
        value: 0
    }
    
    let accum
    jmpIdxes.some(e => {
        const old = commands[e]
        commands[e] = nop
        const terms = terminates(commands)
        
        if (terms[0]) {
            console.log("It terminates!")
            accum = terms[1]
            return true
        }
        
        commands[e] = old
    })

    return accum
}

function terminates(commands : Array<Command>) : [boolean, number] {
    const seenCmdIndices = new Set()

    let accum = 0
    for (let i = 0; i < commands.length; i++) {
        if (seenCmdIndices.has(i)) {
            return [false, accum]
        }

        seenCmdIndices.add(i)
        const command = commands[i]

        switch(command.cmd) {
            case "acc": {
                accum += command.value
                break
            }
            case "nop": {
                break
            }
            case "jmp": {
                i += command.value - 1
                break
            }
        }
    }

    return [true, accum]
}

function parseCommand(line : string) : Command {
    const cmd = line.trim().split(" ")[0] 

    const sign = line.trim().split(" ")[1].charAt(0)
    let value = +line.trim().split(" ")[1].split(sign)[1]

    if (sign === "-") {
        value *= -1
    }

    return { 
        cmd: cmd, 
        value: value,
    }
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input))
}

main()