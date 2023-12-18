package two

import INPUT
import kotlin.math.abs

enum class Direction(val num: Long) {
    LEFT(2),
    RIGHT(0),
    UP(3),
    DOWN(1);

    companion object {
        fun mapStringToDirection(long: Long): Direction = when (long) {
            LEFT.num -> LEFT
            RIGHT.num -> RIGHT
            UP.num -> UP
            DOWN.num -> DOWN
            else -> throw IllegalArgumentException("$long does not match a direction")
        }
    }
}

data class Instruction(
    val steps: Long,
    val direction: Direction
) {
    constructor(line: String) : this(line.toSteps(), line.toDirection())

    companion object {
        fun String.toSteps(): Long = split(" ")[2]
            .let { it.substring(2, it.lastIndex - 1) }
            .toLong(radix = 16)

        fun String.toDirection(): Direction = Direction.mapStringToDirection(
            split(" ")[2]
                .let { it.substring(it.lastIndex - 1, it.lastIndex) }
                .toLong(radix = 16)
        )
    }
}

data class Tile(
    val indices: Pair<Long, Long>,
)

class Lagoon(input: String) {
    private val instructions = input.toInstructions()
    private val tiles = getTilesFromInstructions()

    fun getArea(): Long {
        val shoelace = shoelaceArea(tiles)
        val circumference = getCircumference(tiles)

        return shoelace - circumference / 2 + 1 + circumference
    }

    private fun getTilesFromInstructions(): List<Tile> = buildList {
        add(Tile(0L to 0L))
        instructions.forEachIndexed { i, instruction ->
            add(getTileFromInstruction(instruction, this[i]))
        }
    }

    companion object {
        fun String.toInstructions(): List<Instruction> = split("\n")
            .map(::Instruction)

        private fun getTileFromInstruction(instruction: Instruction, prevTile: Tile): Tile {
            val (x, y) = prevTile.indices

            return Tile(when (instruction.direction) {
                Direction.UP -> x to y - instruction.steps
                Direction.DOWN -> x to y + instruction.steps
                Direction.LEFT -> x  - instruction.steps to y
                Direction.RIGHT -> x  + instruction.steps to y
            })
        }

        private fun cross(p1: Pair<Long, Long>, p2: Pair<Long, Long>): Long =
            (p1.first * p2.second) - (p1.second * p2.first)

        private fun shoelaceArea(loop: List<Tile>): Long {
            var sum = 0L

            for (i in 1..<loop.size) {
                sum += cross(loop[i - 1].indices, loop[i].indices)
            }

            return sum / 2
        }

        private fun getCircumference(tiles: List<Tile>): Long = tiles
            .zipWithNext { t1, t2 ->
                val (t1x, t1y) = t1.indices
                val (t2x, t2y) = t2.indices
                abs(t1x - t2x) + abs(t1y - t2y)
            }
            .sum()
    }
}

fun main() {
    val lagoon = Lagoon(INPUT)
    println(lagoon.getArea())
}
