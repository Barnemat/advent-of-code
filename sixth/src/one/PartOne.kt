package one

import INPUT

data class Race(
    private val duration: Int,
    private val bestDistance: Int,
) {
    fun calculateNumOfPossibleWinDistances(): Int = calculateDistances()
        .filter { it > bestDistance }
        .size

    private fun calculateDistances(): List<Int> =
        (1..<duration).map(::calculateDistance)

    private fun calculateDistance(hold: Int): Int {
        val durationLeft = duration - hold

        return hold * durationLeft
    }
}

class RaceHandler(input: String) {
    private val races = input.inputToRaces()

    fun multiplyWinPossibilities() = races.fold(0) { acc, race ->
        val wins = race.calculateNumOfPossibleWinDistances()
        if (acc > 0) acc * wins else wins
    }

    companion object {
        fun String.inputToRaces(): List<Race> = split("\n")
            .let {
                val durations = it[0].toInts()
                val distances = it[1].toInts()

                durations.mapIndexed { i, duration ->
                    Race(
                        duration = duration,
                        bestDistance = distances[i]
                    )
                }
            }

        private fun String.toInts(): List<Int> = split(Regex("\\w+:"))[1]
            .trim()
            .split(Regex("\\s+"))
            .map { it.toInt() }
    }
}

fun main() {
    val raceHandler = RaceHandler(INPUT)
    println(raceHandler.multiplyWinPossibilities())
}
