package one

import INPUT

data class Spring(
    val brokenMap: String,
    val structure: List<Int>,
) {
    constructor(row: String) : this(row.toMap(), row.toStruct())

    fun getPossibleMaps(): List<String> = getPossibleMaps(brokenMap, structure)

    private fun getPossibleMaps(currentMap: String, structure: List<Int>): List<String> {
        if (!isPossibleMap(currentMap, structure)) return emptyList()
        if ('?' !in currentMap) return listOf(currentMap)

        return getPossibleMaps(currentMap.replaceFirst('?', '.'), structure) +
                getPossibleMaps(currentMap.replaceFirst('?', '#'), structure)
    }

    private fun isPossibleMap(currentMap: String, structure: List<Int>): Boolean {
        val structurePattern = structure.joinToString("") { "[#?]{$it}([.?]+|(?!.*\\S))" }
        val pattern = Regex("^([.?])*$structurePattern\\.*$")
        val match = pattern.find(currentMap)

        return match != null
    }

    companion object {
        fun String.toMap(): String = split(" ")[0]
        fun String.toStruct(): List<Int> = split(" ")[1]
            .split(",")
            .map(String::toInt)
    }
}

class SpringHandler(input: String) {
    private val springs = input.toSprings()

    fun getSum(): Int = springs.sumOf { it.getPossibleMaps().size }

    companion object {
        fun String.toSprings(): List<Spring> = split("\n")
            .map(::Spring)
    }
}

fun main() {
    val springHandler = SpringHandler(INPUT)
    println(springHandler.getSum())
}
