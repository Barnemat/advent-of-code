package one

import INPUT

data class Card(
    val winningNumbers: List<Int>,
    val numbers: List<Int>
) {
    constructor(
        row: String,
        winningNumbers: List<Int> = row.toWinningNumbers(),
        numbers: List<Int> = row.toNumbers(),
    ) : this(winningNumbers, numbers)

    fun cardWorth(): Int = numbers
        .filter { it in winningNumbers }
        .fold(0) { acc, _ -> if (acc == 0) 1 else acc * 2 }

    companion object {
        fun String.toWinningNumbers(): List<Int> =
            split(": ")[1]
                .toNumbers(0)

        fun String.toNumbers(): List<Int> =
            split(": ")[1]
                .toNumbers(1)

        private fun String.toNumbers(index: Int): List<Int> =
            split("|")[index]
                .split(" ")
                .map(String::trim)
                .filter { it.isNotEmpty() }
                .map { it.trim().toInt() }
    }
}

fun main() {
    println(
        INPUT
            .split("\n")
            .map { Card(it) }
            .sumOf { it.cardWorth() }
    )
}
