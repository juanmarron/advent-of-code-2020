

function filterValidStrings1(strings : Array<string>) : Array<string> {

    const valid = []

    strings.forEach(element => {
        // Could do the whole thing as a regex using groups (I think)
        const counts = element.split(" ")[0]
        const letter = element.split(" ")[1].split(":")[0]
        const password = element.split(" ")[2]

        const regexp = RegExp(`^(?:[^${letter}]*[${letter}]){${counts.replace("-", ",")}}[^${letter}]*$`)

        if (regexp.test(password)) {
            valid.push(password)
        }
    });

    return valid
}

function filterValidStrings2(strings : Array<string>) : Array<string> {

    const valid = []

    strings.forEach(element => {
        const counts = element.split(" ")[0]
        const letter = element.split(" ")[1].split(":")[0]
        const password = element.split(" ")[2]

        const first = +counts.split("-")[0]
        const second = +counts.split("-")[1]

        const pre1 = first - 1
        const regexp1 = RegExp(`^.{${pre1}}${letter}.*`)

        const pre2 = second - 1
        const regexp2 = RegExp(`^.{${pre2}}${letter}.*`)

        if ((regexp1.test(password) && !regexp2.test(password)) || (!regexp1.test(password) && regexp2.test(password))) {
            valid.push(password)
        }
    });

    return valid
}

function readFile() : Array<string> {
    const fs = require('fs')
    const array = fs.readFileSync('input').toString().split("\n")
    return array
}

function main() {
    const input = readFile()
    // console.log(filterValidStrings1(input).length)
    console.log(filterValidStrings2(input).length)
}

main()