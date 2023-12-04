package two

import INPUT

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

    fun addCards(cards: List<Card>) {
        wonCards.addAll(cards)
    }

    companion object {
        fun numberOfWonCards(cards: List<Card>): Int = if (cards.isNotEmpty()) {
            cards.size + numberOfWonCards(
                cards.flatMap { it.wonCards }
            )
        } else {
            0
        }

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

class Cards(input: String) {
    private var cards = input
        .split("\n")
        .map { Card(it) }

    init {
        populateWonCards()
    }

    fun getSumOfWonCards(): Int = Card.numberOfWonCards(cards)

    private fun populateWonCards() {
        val reversedCards = cards
            .reversed()

        reversedCards
            .forEachIndexed { index, card ->
                val winning = card.numbersInWinning()
                val fromIndex = (index - winning).let {
                    if (it < 0) 0 else it
                }

                card.addCards(reversedCards.subList(fromIndex, index))
            }

        cards = reversedCards.reversed()
    }
}

fun main() {
    println(
        Cards(INPUT).getSumOfWonCards()
    )
}
