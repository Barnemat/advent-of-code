package two

import INPUT

data class Rows(
    val nums: List<List<Long>>
) {
    constructor(input: String) : this(input.toNums())

    fun getDifferences(): Long = nums.sumOf(::getDifferenceToNext)

    companion object {
        fun String.toNums(): List<List<Long>> = split("\n")
            .map { numString ->
                numString
                    .trim()
                    .split(" ")
                    .map(String::toLong)
            }

        fun getDifferenceToNext(nums: List<Long>): Long = when {
            nums.all { it == 0L } -> 0L
            else -> {
                val nextList = buildList {
                    for (i in 1..<nums.size) {
                        add(nums[i] - nums[i - 1])
                    }
                }

                nums.first() - getDifferenceToNext(nextList)
            }
        }
    }
}

fun main() {
    val rows = Rows(INPUT)
    println(rows.getDifferences())
}
