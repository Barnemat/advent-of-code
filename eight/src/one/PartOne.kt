package one

import INPUT
import one.Node.Companion.toNodes

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

data class NodeMap(
    val nodes: Map<String, Node>,
    val directions: List<Char>,
) {
    constructor(input: String) : this(input.toNodes(), input.toDirections())

    tailrec fun stepsToEnd(
        currentNode: Node = nodes["AAA"]!!,
        depth: Int = 0
    ): Int {
        if (currentNode.key == "ZZZ") return depth

        val index = depth % directions.size
        val direction = directions[index]

        return stepsToEnd(nodes[if (direction == 'L') currentNode.left else currentNode.right]!!, depth + 1)
    }

    companion object {
        fun String.toDirections(): List<Char> = split("\n\n")[0]
            .toList()
    }
}

fun main() {
    println(
        NodeMap(INPUT).stepsToEnd()
    )
}
