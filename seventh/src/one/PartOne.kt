package one

import INPUT
import one.Hand.Companion.toHands

enum class Card(val value: String) {
    A("A"),
    K("K"),
    Q("Q"),
    J("J"),
    T("T"),
    NINE("9"),
    EIGHT("8"),
    SEVEN("7"),
    SIX("6"),
    FIVE("5"),
    FOUR("4"),
    THREE("3"),
    TWO("2")
}

enum class HandValue {
    FIVE_OF_A_KIND,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    THREE_OF_A_KIND,
    TWO_PAIR,
    ONE_PAIR,
    HIGH_CARD,
}

data class Hand(
    private val value: String,
    val bid: Int,
) : Comparable<Hand> {
    private val cardsInHand = getHand()

    private fun getHand(): List<Card> = value.mapNotNull { value ->
        Card.entries.find { it.value == value.toString() }
    }

    private fun hasTwoPairs(valuesPerKind: Map<String, List<Card>>): Boolean = valuesPerKind
        .entries
        .filter { it.value.size == 2 }
        .size == 2

    private fun valueOfHand(): HandValue {
        val perKind = cardsInHand.groupBy { it.value }

        return when {
            perKind.values.any { it.size == 5 } -> HandValue.FIVE_OF_A_KIND
            perKind.values.any { it.size == 4  } -> HandValue.FOUR_OF_A_KIND
            perKind.values.any { it.size == 3 } &&
                    perKind.values.any { it.size == 2 } -> HandValue.FULL_HOUSE
            perKind.values.any { it.size == 3 } -> HandValue.THREE_OF_A_KIND
            hasTwoPairs(perKind) -> HandValue.TWO_PAIR
            perKind.values.any { it.size == 2 } -> HandValue.ONE_PAIR
            else -> HandValue.HIGH_CARD
        }
    }

    override fun compareTo(other: Hand): Int {
        val value = valueOfHand()
        val otherValue = other.valueOfHand()

        if (value == otherValue) {
            cardsInHand.forEachIndexed { i, card ->
                if (card.ordinal > other.cardsInHand[i].ordinal) {
                    return -1
                }

                if (card.ordinal < other.cardsInHand[i].ordinal) {
                    return 1
                }
            }

            return 0
        }

        return if (value.ordinal > otherValue.ordinal) -1 else 1
    }

    companion object {
        fun String.toHands(): List<Hand> = split("\n")
            .map { it.toHand() }

        private fun String.toHand(): Hand = trim()
            .split(" ")
            .let {
                Hand(
                    value = it[0],
                    bid = it[1].toInt()
                )
            }
    }
}

class HandHandler(input: String) {
    private val hands = input.toHands()

    fun multiplyWithBid(): Int = sortedByValue()
        .mapIndexed { i, hand -> hand.bid * (i + 1) }
        .sum()

    private fun sortedByValue(): List<Hand> =
        hands.sorted()
}

fun main() {
    val handHandler = HandHandler(INPUT)
    println(handHandler.multiplyWithBid())
}
