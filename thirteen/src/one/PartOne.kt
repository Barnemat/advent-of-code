package one

import INPUT

data class Pattern(
    val rows: List<String>
) {
    fun findReflectionX() = findReflectionX(rows)
    fun findReflectionY() = findReflectionY(rows)

    companion object {
        fun findReflectionX(rows: List<String>): Int? {
            for (i in 1..rows.lastIndex) {
                val (prev, current) = pruneLastOfLongest(
                    rows.subList(0, i).reversed(),
                    rows.subList(i, rows.size)
                )

                if (prev == current) return i
            }

            return null
        }

        fun findReflectionY(rows: List<String>): Int? = findReflectionX(transform(rows))

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
            pattern.findReflectionX()?.let { sum += 100 * it }
            pattern.findReflectionY()?.let { sum += it }
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
