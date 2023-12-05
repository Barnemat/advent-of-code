package one

import INPUT
import one.SeedMapper.Companion.findMinLocationNumber

val TEST_INPUT = """
    seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48

    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15

    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4

    water-to-light map:
    88 18 7
    18 25 70

    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13

    temperature-to-humidity map:
    0 69 1
    1 0 69

    humidity-to-location map:
    60 56 37
    56 93 4
""".trimIndent()

data class SourceDestination(
    val sourceRange: ClosedRange<Long>,
    val destinationRange: ClosedRange<Long>,
)

data class SourceMap(
    val lines: List<SourceDestination>,
    val name: String,
) {
    constructor(mapString: String) : this(
        name = mapString.toName(),
        lines = mapString.toRanges(),
    )

    fun getDestination(source: Long): Long  = lines
        .find { source in it.sourceRange }
        ?.let { it.destinationRange.start + source - it.sourceRange.start }
        ?: source

    companion object {
        fun String.toLines(): List<String> = split("\n")

        fun String.toName(): String = toLines()[0].trim()

        fun String.toRanges(): List<SourceDestination> = toLines()
            .let { it.subList(1, it.size) }
            .map {
                val numbers = it.toSourceDestinationNumbers()

                SourceDestination(
                    destinationRange = numbers.toRange(0),
                    sourceRange = numbers.toRange(1),
                )
            }

        private fun String.toSourceDestinationNumbers(): List<Long> = trim()
            .split(" ")
            .map { it.toLong() }

        private fun List<Long>.toRange(index: Int): ClosedRange<Long> =
            get(index).let { it..(it + last()) }
    }
}

class SeedMapper(input: String) {
    private val seeds: List<Long>
    private val sourceMaps: List<SourceMap>

    init {
        val parts = input.splitParts()
        seeds = parts[0].toSeeds()
        sourceMaps = parts.toSourceMaps()
    }

    fun getSeedDependencyGraph(seed: Long): List<Long> = buildList {
        var sourceNumber = seed

        sourceMaps.forEach {
            val destination = it.getDestination(sourceNumber)
            add(destination)
            sourceNumber = destination
        }
    }

    fun getSeedDependencyGraphs(): Map<Long, List<Long>> = seeds.associateWith { getSeedDependencyGraph(it) }

    fun <R> withDependencyGraphs(callback: (graphs: Map<Long, List<Long>>) -> R): R =
        callback(getSeedDependencyGraphs())

    companion object {
        fun Map<Long, List<Long>>.findMinLocationNumber(): Long = entries
            .minBy { it.value[it.value.lastIndex] }
            .let {
                it.value[it.value.lastIndex]
            }

        fun String.splitParts(): List<String> = split("\n\n")

        fun String.toSeeds(): List<Long> = split("seeds: ")[1]
            .trim()
            .split(" ")
            .map { it.toLong() }

        fun List<String>.toSourceMaps(): List<SourceMap> = let {
            it.subList(1, it.size)
        }.map { SourceMap(it) }
    }
}

fun main() {
    println(SeedMapper(INPUT).withDependencyGraphs {
        it.findMinLocationNumber()
    })
}
