import { Dir } from "fs"

class DirectedGraphNode {
    name: string
    children: Map<DirectedGraphNode, number> = new Map<DirectedGraphNode, number>()

    constructor(name: string) {
        this.name = name
    }

    isLeaf() {
        return this.children?.size === 0
    }

    addChild(child : DirectedGraphNode, count : number) {
        if (this.children.has(child)) {
            return
        }
        this.children.set(child, count)
    }
}

const allNodes = new Array<DirectedGraphNode>()

function solve(bags : Array<string>) : number {

    bags.forEach(b => {
        const bagId = b.split("bags")[0].trim()
        let currNode = findNodeById(bagId)
        if (!currNode) {
            currNode = new DirectedGraphNode(bagId)
            allNodes.push(currNode)
        }

        const children = parseChildBagIds(b.split("contain")[1].trim())
        // v,k instead of k,v?!??!
        children?.forEach((v, k) => {
            let childNode = findNodeById(k)
            if (!childNode) {
                childNode = new DirectedGraphNode(k)
                allNodes.push(childNode)
            }
            currNode.addChild(childNode, v)
        })
    })

    // There's obviously faster ways to do this rather than iterating through all the nodes, but this was the easiest (but it doesn't scale).
    // option 1: use adjacency matrix
    // option 2: reverse the direction of the edges and find all nodes on paths that start on shinyGold
    const shinyGold = findNodeById("shiny gold")
    // const countBagsContainingShinyGold = allNodes.filter(element => {
    //     if (element === shinyGold) {
    //         return false
    //     }
    //     return pathExists(element, shinyGold) 
    // }).length


    // Subtract 1 because we're counting how many within shinyGold, not including itself.
    return weightedDfs(shinyGold, 1) - 1
}

function findNodeById(id : string) : DirectedGraphNode {
    if (allNodes.map(e => e.name).includes(id)) {
        return allNodes.filter(e => e.name === id)[0]
    }
}

function parseChildBagIds(line : string) : Map<string, number> {
    const splitCommas = line.split(",")

    let children = new Map<string, number>()
    splitCommas.forEach(e => {
        const splitSpace = e.trim().split(" ")
        if (splitSpace[0] !== "no") {
            children.set(splitSpace.slice(1, splitSpace.length-1).reduce((concat, s2) => concat + " " + s2), +splitSpace[0])
        }
    })
    
    return children
}

function pathExists(root : DirectedGraphNode, node : DirectedGraphNode) : boolean {
    if (!root) {
        return
    }
    
    // careful with equality
    if (root === node) {
        return true
    }

    let childPathExists = new Array<boolean>()

    // TODO: What is the most idiomatic way to return values from within anon functions in typescript
    root.children?.forEach((v, k) => {
        childPathExists.push(pathExists(k, node))
    })

    return childPathExists.filter(e => e).length > 0
}

// Includes itself so it'll be off by one if you need only the # contained strictly within the bag
function weightedDfs(root : DirectedGraphNode, multiplier : number) : number {
    if (!root || root.isLeaf()) {
        return multiplier 
    }

    let cost = multiplier

    root.children?.forEach((v, k) => {
        console.log(`root ${root.name}, child ${k.name} has weight ${v}, multiplier: ${multiplier}`)
        cost += weightedDfs(k, multiplier*v)
    })

    return cost
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