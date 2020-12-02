
function solve(numbers : Array<number>, addUpTo : number) : Array<number> {
    for (let i = 0; i < numbers.length; i++) {
        let n = numbers[i];
        let other = addUpTo - n;
        if (numbers.indexOf(other) != -1) {
            return [n, other];
        }
    }
}

function part2(numbers : Array<number>) : Array<number> {
    for (let i = 0; i < numbers.length; i++) {
        let n = numbers[i];
        let other = 2020 - n;

        let otherTwo = solve(numbers, other);

        if (otherTwo !== undefined && otherTwo.length === 2) {
            otherTwo.push(n);
            return otherTwo;
        }
    }
}

function multiply(numbers : Array<number>) {
    let multiply = 1;
    numbers.forEach((n) => {multiply*=n});
    return multiply;
}

function readFile() : Array<number> {
    let fs = require('fs');
    let array = fs.readFileSync('input').toString().split("\n").map(x=>+x);
    return array;
}

function main() {
    let nums = readFile();
    console.log(`First puzzle: ${multiply(solve(nums, 2020))}`);
    console.log(`Second puzzle: ${multiply(part2(nums))}`);
}

main();