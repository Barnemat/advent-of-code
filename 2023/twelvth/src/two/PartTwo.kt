package two

import INPUT

val TEST_DATA = """
    ???.### 1,1,3
    .??..??...?##. 1,1,3
    ?#?#?#?#?#?#?#? 1,3,1,6
    ????.#...#... 4,1,1
    ????.######..#####. 1,6,5
    ?###???????? 3,2,1
""".trimIndent()

typealias CacheKey = Pair<String, List<Int>>

data class Spring(
    val brokenMap: String,
    val structure: List<Int>,
) {
    constructor(row: String) : this(row.toMap(), row.toStruct())

    fun getPossibleMaps(): Long = getPossibleMaps(brokenMap, structure)

    private val cache: MutableMap<CacheKey, Long> = mutableMapOf()

    private fun cache(key: CacheKey, long: Long): Long {
        cache[key] = long

        return long
    }

    private fun getPossibleMaps(currentMap: String, currentStructure: List<Int>): Long {
        val key = currentMap to currentStructure

        cache[key]?.also {
            return it
        }

        fun cache(long: Long): Long = cache(key, long)

        if (currentMap.isEmpty()) {
            return if (currentStructure.isEmpty()) {
                cache(1)
            } else {
                cache(0)
            }
        }

        if (currentStructure.isEmpty()) {
            return if (currentMap.any { it == '#' }) {
                cache(0)
            } else {
                cache(1)
            }
        }

        val structureSizePlusSpaces = currentStructure.sumOf { it } + currentStructure.size - 1

        if (currentMap.length < structureSizePlusSpaces) {
            return cache(0)
        }

        val currentMapFirstRemoved = currentMap.substring(1)

        if (currentMap.first() == '.') {
            return cache(getPossibleMaps(currentMapFirstRemoved, currentStructure))
        }

        if (currentMap.first() == '#') {
            val firstStructure = currentStructure.first()
            val structureFirstRemoved = currentStructure.filterIndexed { i, _ -> i > 0 }

            (0..<firstStructure).forEach {
                if (currentMap[it] == '.') {
                    return cache(0)
                }
            }

            if (currentMap.getOrNull(firstStructure) == '#') return cache(0)

            return cache(
                getPossibleMaps(
                    if (currentMap.length > firstStructure) {
                        currentMap.substring(firstStructure + 1)
                    } else "",
                    structureFirstRemoved
                )
            )
        }

        return cache(getPossibleMaps(".$currentMapFirstRemoved", currentStructure) +
                getPossibleMaps("#$currentMapFirstRemoved", currentStructure))
    }

    companion object {
        fun String.toMap(): String = split(" ")[0]
            .let { str ->
                (1..5).joinToString("?") { _ -> str }
            }

        fun String.toStruct(): List<Int> = split(" ")[1]
            .let { str ->
                (1..5).joinToString(",") { _ -> str }
            }
            .split(",")
            .map(String::toInt)
    }
}

class SpringHandler(input: String) {
    private val springs = input.toSprings()

    fun getSum(): Long = springs.sumOf { it.getPossibleMaps() }

    companion object {
        fun String.toSprings(): List<Spring> = split("\n")
            .map(::Spring)
    }
}

fun main() {
    val springHandler = SpringHandler(INPUT)
    println(springHandler.getSum())
}
