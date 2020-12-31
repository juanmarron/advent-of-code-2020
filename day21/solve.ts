
function solve(input : Array<string>) : string {

    const allergenPossibilities = new Map<string, Array<Array<string>>>()
    // ingr => count
    const allIngredients = new Map<string, number>()
    input.forEach(e => {
        const allergens = e.split("(contains ")[1].split(")")[0].split(", ")
        const ingredients = e.split(" (contains")[0].split(" ")
        
        ingredients.forEach(e => {
            const prevValue = allIngredients.get(e)
            prevValue ? allIngredients.set(e, prevValue + 1) : allIngredients.set(e, 1)
        })

        allergens.forEach(allergen => {
            if (allergenPossibilities.has(allergen)) {
                const newValue = allergenPossibilities.get(allergen).slice()
                newValue.push(ingredients)
                allergenPossibilities.set(allergen, newValue)
            } else {
                allergenPossibilities.set(allergen, [ingredients])
            }
        })
    })
    
    const definitelyHasAllergens = []
    const numAllergens = allergenPossibilities.size
    while (definitelyHasAllergens.length !== numAllergens) {
        allergenPossibilities.forEach((v,k) => {
            const onlyIngredients = definitelyHasAllergens.map(e => e.split(":")[1])
            const inter = intersection(v).filter(e => !onlyIngredients.includes(e))

            if (inter.length === 1) {
                definitelyHasAllergens.push(k + ":" + inter[0])
            }
        })
    }

    definitelyHasAllergens.sort()
    console.log(definitelyHasAllergens)
    // This was for part 1, but it doesn't work anymore since I prepended the alergen to the string for part 2, yolo
    // let final = 0
    // allIngredients.forEach((v,k) => {
    //     if (!definitelyHasAllergens.includes(k)) {
    //         final += v
    //     }
    // })
    
    return definitelyHasAllergens.map(e => e.split(":")[1]).join(",")
}

function intersection(array : Array<Array<string>>) : Array<string> {
    return array.reduce((r1,r2) => { return r1.filter(x => r2.includes(x))})
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