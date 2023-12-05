package two

import INPUT

data class SourceDestination(
    val source: Long,
    val destination: Long,
    val step: Long,
)

data class SourceMap(
    val lines: List<SourceDestination>,
    val name: String,
) {
    constructor(mapString: String) : this(
        name = mapString.toName(),
        lines = mapString.toRanges(),
    )

    fun getDestination(seed: Long): Long {
        val matches: List<SourceDestination> = lines.filter { seed in it.source..<(it.source + it.step) }

        return if (matches.size > 1) {
            // Possibly not needed
            matches
                .map { getDestination(it.destination + (seed - it.source)) }
                .min()
        } else if (matches.size == 1) {
            val match = matches.first()
            match.destination + (seed - match.source)
        } else {
            seed
        }
    }

    companion object {
        fun String.toName(): String = toLines()[0].trim()

        fun String.toRanges(): List<SourceDestination> = toLines()
            .let { it.subList(1, it.size) }
            .map {
                val numbers = it.toSourceDestinationNumbers()

                SourceDestination(
                    destination = numbers[0],
                    source = numbers[1],
                    step = numbers[2]
                )
            }

        private fun String.toLines(): List<String> = split("\n")

        private fun String.toSourceDestinationNumbers(): List<Long> = trim()
            .split(" ")
            .map { it.toLong() }
    }
}

// 37806487

class SeedMapper(input: String) {
    private val seeds: List<ClosedRange<Long>>
    private val sourceMaps: List<SourceMap>

    init {
        val parts = input.splitParts()
        seeds = parts[0].toSeeds()
        sourceMaps = parts.toSourceMaps()
    }

    fun findMinLocationNumber(): Long =
        seeds.minOfOrNull { getMinLocationNumber(it) } ?: Long.MAX_VALUE

    private fun getMinLocationNumber(seedRange: ClosedRange<Long>): Long =
        (seedRange.start..seedRange.endInclusive).minOfOrNull { seed ->
            sourceMaps.fold(seed) { nextSourceNumber, sourceMap ->
                sourceMap.getDestination(nextSourceNumber)
            }
        } ?: Long.MAX_VALUE

    companion object {
        fun String.splitParts(): List<String> = split("\n\n")

        fun String.toSeeds(): List<ClosedRange<Long>> = buildList {
            val numbers = split("seeds: ")[1]
                .trim()
                .split(" ")
                .toMutableList()

            while (numbers.size > 0) {
                val start = numbers.removeFirst().toLong()
                val step = numbers.removeFirst().toLong()

                add(start..<start + step)
            }
        }

        fun List<String>.toSourceMaps(): List<SourceMap> = let {
            it.subList(1, it.size)
        }.map { SourceMap(it) }
    }
}

fun main() {
    println(SeedMapper(INPUT).findMinLocationNumber())
}
