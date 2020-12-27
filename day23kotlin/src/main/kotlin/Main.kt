
import java.io.File
import java.lang.IllegalArgumentException
import kotlin.collections.HashMap

class Node(val data : Int, var next : Node?) {
    override fun toString(): String {
        return data.toString() + "->" + next?.data.toString()
    }
}

fun solveEfficiently(input: String, numMoves: Int, totalNumbers: Int): Long {
    val cups = generateInput(input, totalNumbers)
    var currentCup = cups[Integer.parseInt(input[0].toString())]!!

    for (i in 1..numMoves) {
        if (i % 5000 == 0) {
            println("Processed ${i}")
        }

        val triplet = get3Clockwise(currentCup, cups)
        val destination = findDestination(currentCup.data, cups, triplet.map { e -> e.data }, totalNumbers)

        // now for the linked list twiddling

        val newNext = currentCup.next?.next?.next?.next
        currentCup.next = newNext
        val destinationsNext = destination.next
        destination.next = triplet[0]
        triplet[2].next = destinationsNext

        currentCup = currentCup.next!!
    }

    val clockwise1 = cups[1]?.next?.data!!.toLong()
    val clockwise2 = cups[1]?.next?.next?.data!!.toLong()
    println(clockwise1)
    println(clockwise2)

    return clockwise1 * clockwise2
}

    fun backToArray(curr : Node, iters : Int) : List<Int> {
        val list = mutableListOf<Int>()
        var current = curr
        for (i in 0 until iters) {
            list.add(current.data)
            current = current.next!!
        }

        return list
    }

    fun generateInput(initialNumbers: String, totalNumbers: Int): Map<Int, Node> {
        var cups = initialNumbers.toCharArray().map { x -> Integer.parseInt(x.toString()) }.toMutableList()
        var max = cups.reduce { n1, n2 -> Math.max(n1, n2) }

        for (i in max+1 .. totalNumbers) {
            cups.add(i)
        }

        val nodes = HashMap<Int, Node>()
        cups.forEach {
           element ->
                run {
                    var node = Node(element, null)
                    nodes[element] = node
                }
        }

        cups.forEachIndexed{ idx, element ->
            run {
                var currentNode = nodes[element]!!
                if (idx == cups.size-1) {
                    //wrap around
                    currentNode.next = nodes[cups[0]]
                } else {
                    currentNode.next = nodes[cups[idx + 1]]
                }
            }
        }

        return nodes
    }

    fun get3Clockwise(currentCup: Node, cups : Map<Int, Node>): List<Node> {
        val triplet = mutableListOf<Node>()
        var curr = currentCup
        for (i in 0..2) {
            triplet.add(curr.next!!)
            curr = curr.next!!
        }

        return triplet
    }

    fun findDestination(currentCup: Int, cups : Map<Int, Node>, ignore: List<Int>, max : Int): Node {
        var destination = currentCup - 1
        while (ignore.contains(destination) || !cups.containsKey(destination)) {
            destination--
            if (destination < 1) {
                destination = max
            }
        }

        return cups[destination]!!
    }

    fun readInputArray(): String {
        return File("input").readLines()[0]
    }

    fun main(args: Array<String>) {
        var input = readInputArray()
        println(solveEfficiently(input, 10000000, 1000000))
    }
