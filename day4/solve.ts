
const firstRegex = RegExp("(?=.*byr)(?=.*iyr)(?=.*eyr)(?=.*hgt)(?=.*hcl)(?=.*ecl)(?=.*pid)")
const byr = "(?=.*byr:(19[2-9]\\d|200[0,1,2])(\\s|$))"
const iyr = "(?=.*iyr:(201\\d|2020)(\\s|$))"
const eyr = "(?=.*eyr:(202\\d|2030)(\\s|$))"
const hgt = "(?=.*hgt:((1[5-8]\\d|19[0-3])cm|(59|6\\d|7[0-6])in)(\\s|$))"
const hcl = "(?=.*hcl:#[0-9,a-f]{6}(\\s|$))"
const ecl = "(?=.*ecl:(amb|blu|brn|gry|grn|hzl|oth)(\\s|$))"
const pid = "(?=.*pid:\\d{9}(\\s|$))"

const secondRegex = RegExp(byr + iyr + eyr + hgt + hcl + ecl + pid)

function solve(passports : Array<string>, regex : RegExp) : Array<string> {
    console.log(regex)
    return passports.filter(p => regex.test(p))
}

function readInputArray() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n\n").map(e => e.replace(/\n/g, " "))
    return array
}

function main() {
    const input = readInputArray()
    console.log(solve(input, firstRegex).length)
    console.log(solve(input, secondRegex).length)
}

main()