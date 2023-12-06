package two

import INPUT

data class Race(
    private val duration: Long,
    private val bestDistance: Long,
) {
    fun calculateNumOfPossibleWinDistances(): Int = calculateDistances()
        .filter { it > bestDistance }
        .size

    private fun calculateDistances(): List<Long> =
        (1..<duration).map(::calculateDistance)

    private fun calculateDistance(hold: Long): Long {
        val durationLeft = duration - hold

        return hold * durationLeft
    }
}

class RaceHandler(input: String) {
    private val race = input.inputToRace()
    val wins = race.calculateNumOfPossibleWinDistances()

    companion object {
        fun String.inputToRace(): Race = split("\n")
            .let {
                val duration = it[0].toNum()
                val distance = it[1].toNum()

                Race(
                    duration = duration,
                    bestDistance = distance
                )

            }

        private fun String.toNum(): Long = split(Regex("\\w+:"))[1]
            .trim()
            .replace(Regex("\\s+"), "")
            .toLong()
    }
}

fun main() {
    val raceHandler = RaceHandler(INPUT)
    println(raceHandler.wins)
}
