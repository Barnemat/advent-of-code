package two.lcm

import INPUT
import two.lcm.Node.Companion.toNodes

data class Node(
    val key: String,
    val left: String,
    val right: String
) {
    companion object {
        fun String.toNodes(): Map<String, Node> = split("\n\n")[1]
            .split("\n")
            .map { it.toNode() }
            .associateBy { it.key }

        private fun String.toNode(): Node {
            val (key, tuple) = split(" = ")
            val (left, right) = tuple
                .split(", ")
                .map { it.replace(Regex("[()]"), "") }

            return Node(
                key = key,
                left = left,
                right = right
            )
        }
    }
}

fun gcdTwoNums(a: Long, b: Long): Long {
    var inputA = a
    var inputB = b

    while (inputB > 0) {
        val temp = inputB
        inputB = inputA % inputB
        inputA = temp
    }

    return inputA
}

private fun List<Long>.foldingFun(
    func: (a: Long, b: Long) -> Long
): Long = foldIndexed(0L) { i, acc, num -> if (i == 0) num else func(acc, num) }

fun lcmTwoNums(a: Long, b: Long): Long = a * (b / gcdTwoNums(a, b))

fun lcm(nums: List<Long>): Long = nums.foldingFun(::lcmTwoNums)

data class NodeMap(
    val nodes: Map<String, Node>,
    val directions: List<Char>,
) {
    constructor(input: String) : this(input.toNodes(), input.toDirections())

    fun leastCommonMultiple(): Long =
        lcm(endsWithA().map { stepsToEnd(it.value) })

    private tailrec fun stepsToEnd(
        currentNode: Node = nodes["AAA"]!!,
        depth: Long = 0
    ): Long {
        if (currentNode.key.endsWith("Z")) return depth

        val index = (depth % directions.size).toInt()
        val direction = directions[index]

        return stepsToEnd(nodes[if (direction == 'L') currentNode.left else currentNode.right]!!, depth + 1)
    }

    private fun endsWithA(): Map<String, Node> =
        nodes.filterKeys { it.endsWith("A") }

    companion object {
        fun String.toDirections(): List<Char> = split("\n\n")[0]
            .toList()
    }
}

fun main() {
    println(
        NodeMap(INPUT).leastCommonMultiple()
    )
}

