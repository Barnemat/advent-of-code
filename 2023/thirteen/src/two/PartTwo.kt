package two

import INPUT

data class Pattern(
    val rows: List<String>
) {
    fun findReflectionX(lastPatternX: Int?) = findReflectionX(rows, lastPatternX)
    fun findReflectionY(lastPatternY: Int?) = findReflectionY(rows, lastPatternY)

    companion object {
        fun findReflectionX(
            rows: List<String>,
            lastPatternX: Int?
        ): Int? {
            for (i in 1..rows.lastIndex) {
                val (prev, current) = pruneLastOfLongest(
                    rows.subList(0, i).reversed(),
                    rows.subList(i, rows.size)
                )

                if (prev == current && i != lastPatternX) return i
            }

            return null
        }

        fun findReflectionY(
            rows: List<String>,
            lastPatternY: Int?
        ): Int? = findReflectionX(
            transform(rows),
            lastPatternY
        )

        private fun pruneLastOfLongest(list1: List<String>, list2: List<String>): Pair<List<String>, List<String>> {
            if (list1.size == list2.size) return list1 to list2
            if (list1.size > list2.size) return list1.subList(0, list2.size) to list2
            return list1 to list2.subList(0, list1.size)
        }

        private fun transform(rows: List<String>) = buildList {
            rows.first().indices.forEach { i ->
                add(
                    rows.fold("") { acc, row ->
                        row[i] + acc
                    }
                )
            }
        }
    }
}

class PatternHandler(input: String) {
    private val patterns = input.toPatterns()

    fun sumPatterns(): Int {
        var sum = 0

        patterns.forEach { pattern ->
            val firstPatternX = pattern.findReflectionX(null)
            val firstPatternY = if (firstPatternX == null) {
                pattern.findReflectionY(null)
            } else null

            var secondPatternX: Int? = null
            var secondPatternY: Int? = null

            val rows = pattern.rows

            for (rowIndex in rows.indices) {
                if (secondPatternY != null || secondPatternX != null) break

                val rowPart1 = rows.subList(0, rowIndex)
                val currentRow = rows[rowIndex]
                val rowPart2 = if (rowIndex < rows.lastIndex) {
                    rows.subList(rowIndex + 1, rows.size)
                } else emptyList()

                for (colIndex in currentRow.indices) {
                    val updatedPattern = Pattern(
                        rows = rowPart1 +
                            currentRow
                                .mapIndexed { index, c ->
                                    if (index == colIndex) {
                                        if (c ==  '.') '#' else '.'
                                    } else  c
                                }
                                .joinToString("") +
                            rowPart2
                    )

                    secondPatternX = updatedPattern
                        .findReflectionX(firstPatternX)

                    if (secondPatternX !=  null) break

                    secondPatternY = updatedPattern
                        .findReflectionY(firstPatternY)

                    if (secondPatternY != null) break
                }
            }

            secondPatternX?.let { sum += 100 * it }
            secondPatternY?.let { sum += it }
        }

        return sum
    }

    companion object {
        fun String.toPatterns(): List<Pattern> = split("\n\n")
            .map { Pattern(it.toRows()) }

        private fun String.toRows(): List<String> = split("\n")
    }
}

fun main() {
    val patternHandler = PatternHandler(INPUT)
    println(patternHandler.sumPatterns())
}
