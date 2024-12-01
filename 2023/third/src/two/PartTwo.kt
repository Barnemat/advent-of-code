package third.src.two

import second.INPUT

private val STAR_SYMBOL_REGEX = Regex("\\*")

data class StarSymbol(
    val rowIndex: Int,
    val colIndex: Int
) {
    private val adjacentParts: MutableList<PartNumber> = mutableListOf()

    private fun isGear(): Boolean = adjacentParts.size == 2

    fun gearRatio(): Int = with(adjacentParts) {
        if (isGear()) {
            get(0).partNumber * get(1).partNumber
        } else 0
    }

    fun addAdjacentPart(part: PartNumber) {
        adjacentParts.add(part)
    }
}

data class PartNumber(
    val partNumber: Int,
    val rowIndex: Int,
    val startColIndex: Int,
    val lastColIndex: Int,
    private val rows: List<String>,
    private val starSymbols: List<StarSymbol>
) {
    init {
        populateStarSymbols(starSymbols)
    }

    private fun populateStarSymbols(
        starSymbols: List<StarSymbol>
    ) {
        val loopStart = startColIndex - 1
        val loopEnd = lastColIndex + 1

        for (colIndex in loopStart..loopEnd) {
            starSymbols.findOnPositionAndAddPart(rowIndex - 1, colIndex)
            starSymbols.findOnPositionAndAddPart(rowIndex, colIndex)
            starSymbols.findOnPositionAndAddPart(rowIndex + 1, colIndex)
        }
    }

    private fun List<StarSymbol>.findOnPositionAndAddPart(
        rowIndex: Int,
        colIndex: Int
    ) {
        find { it.rowIndex == rowIndex && it.colIndex == colIndex }
            ?.addAdjacentPart(this@PartNumber)
    }
}

data class EngineSchema(
    val schemaString: String,
) {
    private val rows: List<String> = schemaString.toRows()
    private val starSymbols: List<StarSymbol> = rows.toSymbols()

    init {
        populateStarSymbols(rows, starSymbols)
    }

    fun gearRatioSum(): Int = starSymbols
        .sumOf { it.gearRatio() }

    private fun populateStarSymbols(
        rows: List<String>,
        starSymbols: List<StarSymbol>
    ) = rows.forEachIndexed { rowIndex, rowString ->
        Regex("\\d+")
            .findAll(rowString)
            .forEach {
                PartNumber(
                    partNumber = it.value.toInt(),
                    rowIndex = rowIndex,
                    startColIndex = it.range.first,
                    lastColIndex = it.range.last,
                    rows = rows,
                    starSymbols = starSymbols
                )
            }
    }

    companion object {
        private fun String.toRows(): List<String> =
            split("\n")

        fun List<String>.toSymbols(): List<StarSymbol> = flatMapIndexed { rowIndex, rowString ->
            STAR_SYMBOL_REGEX
                .findAll(rowString)
                .map {
                    StarSymbol(
                        rowIndex = rowIndex,
                        colIndex = it.range.first
                    )
                }
        }
    }
}

fun main() {
    val schema = EngineSchema(INPUT)
    println(schema.gearRatioSum())
}
