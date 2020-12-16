
function lilbits(input : Array<string>) {

    const memoryRegisters = new Map<bigint, bigint>()
    let currentMask
    input.forEach(e => {
        const spl = e.split("=")
        if (spl[0].trim() === "mask") {
            currentMask = spl[1].trim()
        } else {
            let memoryLocation = +spl[0].split("[")[1].split("]")[0]
            let value = +spl[1].trim() 
            memoryRegisters.set(BigInt(memoryLocation), applyMask(currentMask, value))
        }
    })

    return sumOneSumAll(memoryRegisters)
}

function memoryDecoder(input : Array<string>) {

    const memoryRegisters = new Map<bigint, bigint>()
    let currentMask
    input.forEach(e => {
        const spl = e.split("=")
        if (spl[0].trim() === "mask") {
            currentMask = spl[1].trim()
        } else {
            let memoryLocation = +spl[0].split("[")[1].split("]")[0]
            let value = BigInt(+spl[1].trim())
            let decodedMemoryLocations = applyMaskFloatingPoint(currentMask, memoryLocation)
            decodedMemoryLocations.forEach(m => memoryRegisters.set(m, value))
        }
    })

    return sumOneSumAll(memoryRegisters)
}

function applyMaskFloatingPoint(mask : string, value : number) : Array<bigint> {

    const exes = mask.split('').map( (e, idx) => {
        if (e === "X") {
            return idx
        } 
    }).filter(e => e !== undefined)
    
    const maskOr = BigInt(parseInt(mask.replace(/X/g, "0"), 2))
    let ored = BigInt(maskOr | BigInt(value)).toString(2).padStart(36, "0")
    // add exes back in
    exes.forEach(x => {
        ored = replaceAt(ored, x, "X")
    })
    
    return findPermutations(ored).map(p => BigInt(parseInt(p, 2)))
}

function replaceAt(str : string, index : number, replacement : string) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

function findPermutations(value : string) : Array<string> {
    if (value.indexOf("X") === -1) {
        return []
    }

    let permutations = []
    permutations.push(value.replace("X", "0"))
    permutations.push(value.replace("X", "1"))

    return permutations.concat(findPermutations(permutations[0])).concat(findPermutations(permutations[1])).filter(e => e.indexOf("X") === -1)
}

// Use bigints otherwise the bitwise operations lose precision (they work on 32 bit numbers). awful.
function applyMask(mask : string, value : number) : bigint {
    let retValue = BigInt(value)
    // Mask the zeros first by replacing x's with 1s and using &
    const maskAnd = BigInt(parseInt(mask.replace(/X/g, "1"), 2))
    const anded = BigInt(maskAnd & retValue)
    
    const maskOr = BigInt(parseInt(mask.replace(/X/g, "0"), 2))
    const ored = maskOr | anded

    return ored
}

function sumOneSumAll(memory : Map<bigint, bigint>) : bigint {
    let sum = BigInt(0)
    memory.forEach((v,k) => sum+=v)
    return sum
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readInputArray()
    console.log(lilbits(input))
    console.log(memoryDecoder(input))
}

main()