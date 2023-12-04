package two

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

class Game (line: String) {
    private val id: Int
    private val sets: List<CubesInSet>

    init {
        val idToSets = getIdToCubesInGame(line)
        id = idToSets.first
        sets = idToSets.second
    }

    fun powerOfMinValues(): Int = buildMap<CubeColor, Int> {
            putAll(
                mapOf(
                    CubeColor.RED to 0,
                    CubeColor.GREEN to 0,
                    CubeColor.BLUE to 0
                )
            )

            sets.forEach {
                CubeColor.entries.forEach { cubeColor ->
                    it[cubeColor]?.let {
                        val prevValue = get(cubeColor)!!

                        if (it > prevValue) {
                            put(cubeColor, it)
                        }
                    }
                }
            }
        }
        .values
        .reduce { acc, i -> i * acc }

    companion object {
        private fun getId(line: String): Int = line
            .trim()
            .removePrefix("Game ").toInt()

        private fun getSets(setsString: String): List<CubesInSet> = setsString
            .split(";")
            .map { getCubesInSet(it) }

        private fun getCubesInSet(setString: String): CubesInSet = setString
            .split(", ")
            .map {
                val (count, color) = it
                    .trim()
                    .split(" ")

                Cubes(color, count)
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

class Games (input: String) {
    private val games: List<Game> = input
        .split("\n")
        .map(::Game)

    fun getSumOfPowerOfGameMinValues() = games.sumOf { it.powerOfMinValues() }
}

fun main() {
    println(Games(INPUT).getSumOfPowerOfGameMinValues())
}
