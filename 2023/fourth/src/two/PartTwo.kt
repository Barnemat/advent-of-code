package two

import INPUT
import two.Card.Companion.numberOfWonCards

class Card private constructor(
    private val winningNumbers: List<Int>,
    private val numbers: List<Int>
) {
    private val wonCards = mutableListOf<Card>()

    constructor(
        row: String,
        winningNumbers: List<Int> = row.toWinningNumbers(),
        numbers: List<Int> = row.toNumbers(),
    ) : this(winningNumbers, numbers)

    fun numbersInWinning(): Int = numbers
        .filter { it in winningNumbers }
        .size

    fun addCards(cards: List<Card>) { wonCards.addAll(cards) }

    companion object {
        fun List<Card>.numberOfWonCards(): Int = if (isNotEmpty()) {
            flatMap { it.wonCards }.numberOfWonCards() + size
        } else 0

        fun String.toWinningNumbers(): List<Int> = pruneGameString()
            .toNumbers(0)

        fun String.toNumbers(): List<Int> = pruneGameString()
            .toNumbers(1)

        private fun String.pruneGameString(): String = split(": ")[1]

        private fun String.toNumbers(index: Int): List<Int> = split("|")[index]
            .split(" ")
            .map { it.trim() }
            .filter { it.isNotEmpty() }
            .map { it.trim().toInt() }
    }
}

class Cards(input: String) {
    private var cards = input
        .split("\n")
        .map(::Card)

    init {
        populateWonCards()
    }

    fun getSumOfWonCards(): Int = cards.numberOfWonCards()

    private fun populateWonCards() {
        val reversedCards = cards.reversed()

        reversedCards
            .forEachIndexed { index, card ->
                val winningNumbers = card.numbersInWinning()
                val fromIndex = (index - winningNumbers).let { if (it < 0) 0 else it }

                card.addCards(reversedCards.subList(fromIndex, index))
            }

        cards = reversedCards.reversed() // Not really needed, but nice for consistency
    }
}

fun main() {
    println(Cards(INPUT).getSumOfWonCards())
}
