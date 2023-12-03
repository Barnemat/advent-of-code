package one

import INPUT

private val SYMBOL_REGEX = Regex("[^\\d.]")

class PartNumber(
    val partNumber: Int,
    val rowIndex: Int,
    val startColIndex: Int,
    val lastColIndex: Int,
    rows: List<String>
) {
    val hasAdjacentSymbol = hasAdjacentSymbol(rows)

    private fun hasAdjacentSymbol(rows: List<String>): Boolean {
        val prevRow = rows.getOrNull(rowIndex - 1)
        val row = rows[rowIndex]
        val nextRow = rows.getOrNull(rowIndex + 1)
        val loopStart = startColIndex - 1
        val loopEnd = lastColIndex + 1

        for (colIndex in loopStart..loopEnd) {
            when {
                isSymbol(prevRow?.getOrNull(colIndex)) -> return true
                isSymbol(row.getOrNull(colIndex)) -> return true
                isSymbol(nextRow?.getOrNull(colIndex)) -> return true
            }
        }

        return false
    }

    private fun isSymbol(rowValue: Char?): Boolean =
        rowValue
            ?.toString()
            ?.matches(SYMBOL_REGEX)
            ?: false
}

data class EngineSchema(
    val schemaString: String,
) {
    private val rows = schemaString.toRows()
    private val parts = rows.toParts()

    fun partSum(): Int = parts
        .filter { it.hasAdjacentSymbol }
        .sumOf { it.partNumber }

    companion object {
        private fun String.toRows(): List<String> =
            split("\n")

        fun List<String>.toParts(): List<PartNumber> = flatMapIndexed { rowIndex, rowString ->
            Regex("\\d+")
                .findAll(rowString)
                .map {
                    PartNumber(
                        partNumber = it.value.toInt(),
                        rowIndex = rowIndex,
                        startColIndex = it.range.first,
                        lastColIndex = it.range.last,
                        rows = this
                    )
                }
            }
        }
}

fun main() {
    val schema = EngineSchema(INPUT)
    println(schema.partSum())
}
