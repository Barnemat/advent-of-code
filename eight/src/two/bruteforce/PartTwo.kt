package two.bruteforce

import INPUT
import two.bruteforce.Node.Companion.toNodes

// This will never be done computing

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
        currentNodes: Map<String, Node> = endsWithA(),
        depth: Int = 0
    ): Int {
        if (currentNodes.allEndsWithZ()) return depth

        val index = depth % directions.size
        val direction = directions[index]

        val newKeys = currentNodes.map { (_, value) ->
            if (direction == 'L') {
                value.left
            } else {
                value.right
            }
        }

        val updatedNodes = nodes.filterKeys { it in newKeys }

        return stepsToEnd(updatedNodes, depth + 1)
    }

    private fun endsWithA(): Map<String, Node> =
        nodes.filterKeys { it.endsWith("A") }

    companion object {
        fun String.toDirections(): List<Char> = split("\n\n")[0]
            .toList()

        fun Map<String, Node>.allEndsWithZ(): Boolean =
            keys.all { it.endsWith("Z") }
    }
}

fun main() {
    println(
        NodeMap(INPUT).stepsToEnd()
    )
}
