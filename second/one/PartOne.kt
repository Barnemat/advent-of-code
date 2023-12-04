package one

import second.INPUT
import java.lang.IllegalArgumentException

enum class CubeColor {
    RED,
    GREEN,
    BLUE
}

data class Cubes(
    val color: CubeColor,
    val count: Int
) {
    constructor(
        color: String,
        count: String
    ) : this(
        getColor(color),
        getCount(count)
    )

    companion object {
        fun getColor(color: String): CubeColor {
            if (color == "red") {
                return CubeColor.RED
            }

            if (color == "green") {
                return CubeColor.GREEN
            }

            if (color == "blue") {
                return CubeColor.BLUE
            }

            throw IllegalArgumentException("Invalid argument color $color")
        }

        fun getCount(count: String): Int = count.toInt()
    }
}

typealias CubesInSet = Map<CubeColor, Int>

private fun CubesInSet.isValid(ruleSet: Rules): Boolean =
    all { (color, count) ->
        count <= ruleSet.colorMaxCount[color]!!
    }

data class Rules(
    val colorMaxCount: CubesInSet
)

class Game (line: String, private val rules: Rules) {
    val id: Int

    private val sets: List<CubesInSet>

    init {
        val idToSets = getIdToCubesInGame(line)
        id = idToSets.first
        sets = idToSets.second
    }

    fun isValid(): Boolean = sets.all { it.isValid(rules) }

    companion object {
        private fun getId(line: String): Int = line
            .trim()
            .removePrefix("Game ")
            .toInt()

        private fun getSets(setsString: String): List<CubesInSet> = setsString
            .split(";")
            .map { getCubesInSet(it) }

        private fun getCubesInSet(setString: String): CubesInSet = setString
            .split(", ")
            .map {
                val (count, color) = it
                    .trim()
                    .split(" ")

                Cubes(color = color, count = count)
            }
            .associate { it.color to it.count }

        fun getIdToCubesInGame(line: String): Pair<Int, List<CubesInSet>> {
            val splitOnColon = line.split(":")
            val id = getId(splitOnColon.removeFirst())
            val sets = getSets(splitOnColon.first())

            return id to sets
        }
    }
}

class Games (
    input: String,
    rules: Rules
) {
    private val games: List<Game> = input
        .split("\n")
        .map { Game(it, rules) }

    fun getSumOfValidGameIds() = games
        .filter { it.isValid() }
        .sumOf { it.id }
}

fun main() {
    println(
        Games(
        INPUT,
        Rules(
            colorMaxCount = mapOf(
                CubeColor.RED to 12,
                CubeColor.GREEN to 13,
                CubeColor.BLUE to 14
            )
        )
    ).getSumOfValidGameIds())
}
