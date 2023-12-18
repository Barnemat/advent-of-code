package one

import INPUT
import kotlin.math.abs

enum class Direction(val char: String) {
    LEFT("L"),
    RIGHT("R"),
    UP("U"),
    DOWN("D");

    companion object {
        fun mapStringToDirection(string: String): Direction = when (string) {
            LEFT.char -> LEFT
            RIGHT.char -> RIGHT
            UP.char -> UP
            DOWN.char -> DOWN
            else -> throw IllegalArgumentException("$string does not match a direction")
        }
    }
}

data class Instruction(
    val steps: Int,
    val direction: Direction
) {
    constructor(line: String) : this( line.toSteps(), line.toDirection())

    companion object {
        fun String.toSteps(): Int = split(" ")[1].toInt()
        fun String.toDirection(): Direction = Direction.mapStringToDirection(
            split(" ")[0]
        )
    }
}

data class Tile(
    val indices: Pair<Int, Int>,
)

class Lagoon(input: String) {
    private val instructions = input.toInstructions()
    private val tiles = getTilesFromInstructions()

    fun getArea(): Int {
        val shoelace = shoelaceArea(tiles)
        val circumference = getCircumference(tiles)

        return shoelace - circumference / 2 + 1 + circumference
    }

    private fun getTilesFromInstructions(): List<Tile> = buildList {
        add(Tile(0 to 0))
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

        private fun cross(p1: Pair<Int, Int>, p2: Pair<Int, Int>): Int =
            (p1.first * p2.second) - (p1.second * p2.first)

        private fun shoelaceArea(loop: List<Tile>): Int {
            var sum = 0

            for (i in 1..<loop.size) {
                sum += cross(loop[i - 1].indices, loop[i].indices)
            }

            return sum / 2
        }

        private fun getCircumference(tiles: List<Tile>): Int = tiles
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
