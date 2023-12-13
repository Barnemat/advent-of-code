package two

import INPUT
import two.GalaxyPair.Companion.toGalaxyPairs
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

typealias Image = List<List<Content>>

enum class Content(val char: Char) {
    GALAXY('#'),
    EMPTY_SPACE('.');

    companion object {
        fun mapInputToContent(input: String): Image = input
            .split("\n")
            .map { row ->
                row.map { if (it == GALAXY.char)  GALAXY else EMPTY_SPACE }
            }
    }
}

object ImageExpander {
    fun getEmptyRows(image: Image): Set<Int> = buildSet {
        image
            .map { row ->
                row.all { it == Content.EMPTY_SPACE }
            }
            .forEachIndexed { index, bool ->
                if (bool) add(index)
            }
    }

    fun getEmptyCols(image: Image): Set<Int> = buildSet {
        val cols = image
            .first()
            .indices
            .map { true }
            .toMutableList()

        image.forEach { row ->
            row.forEachIndexed { j, content ->
                if (content == Content.GALAXY) {
                    cols[j] = false
                }
            }
        }

        addAll(
            cols.foldIndexed(emptySet()) { i, acc, bool ->
                if (bool) {
                    acc + i
                } else acc
            }
        )
    }
}

data class GalaxyPair(
    val x1: Int,
    val y1: Int,
    val x2: Int,
    val y2: Int
) {
    constructor(pair: Pair<Pair<Int, Int>, Pair<Int, Int>>) : this(
        x1 = pair.first.first,
        y1 = pair.first.second,
        x2 = pair.second.first,
        y2 = pair.second.second
    )

    fun manhattanDistance(image: Image): Long {
        val emptyRows = ImageExpander.getEmptyRows(image)
        val emptyCols = ImageExpander.getEmptyCols(image)

        val rowsCrossed = emptyRows.count { it in min(x1, x2)..max(x1, x2) }
        val colsCrossed = emptyCols.count { it in min(y1, y2)..max(y1, y2) }

        val distance = abs(x2 - x1) + abs(y2 - y1)

        return distance + (rowsCrossed + colsCrossed) * 999999L // One step down because annoying
    }

    companion object {
        fun Image.toGalaxyPairs(): GalaxyPairs = buildSet {
            val galaxies = mutableSetOf<Pair<Int, Int>>()

            this@toGalaxyPairs.forEachIndexed { i, row ->
                row.forEachIndexed { j, content ->
                    if (content == Content.GALAXY) {
                        galaxies.add(i to j)
                    }
                }
            }

            galaxies.forEach { g1 ->
                galaxies.forEach { g2 ->
                    if (g1 != g2 && GalaxyPair(g2 to g1) !in this) {
                        add(GalaxyPair(g1 to g2))
                    }
                }
            }
        }
    }
}

typealias GalaxyPairs = Set<GalaxyPair>

data class Universe(
    val image: Image
) {
    constructor(input: String) : this(Content.mapInputToContent(input))

    private val galaxyPairs: GalaxyPairs = image.toGalaxyPairs()

    fun getSumOfDistances(): Long = galaxyPairs.sumOf {
        it.manhattanDistance(image)
    }
}

fun main() {
    val universe = Universe(INPUT)

    println(universe.getSumOfDistances())
}

