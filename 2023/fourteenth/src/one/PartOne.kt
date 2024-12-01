package one

import INPUT

class Board(input: String) {
    private val board = input.toRows()

    fun sumOfLoads(): Int = transformBoard().sumOf(::countRowLoad)

    private fun countRowLoad(row: String): Int {
        var sum = 0
        var cubesIndex = 0
        var roundAfterCube = 0

        row.forEachIndexed { index, it ->
            if (it == '#') {
                cubesIndex = index + 1
                roundAfterCube = 0
            } else if (it == 'O') {
                sum += row.length - cubesIndex - roundAfterCube
                roundAfterCube += 1
            }
        }

        return sum
    }

    /** cols to rows */
    private fun transformBoard(): List<String> = buildList {
        board[0].indices.forEachIndexed { i, _ ->
            add(
                board.fold("") { acc, row ->
                    acc + row[i]
                }
            )
        }
    }

    companion object {
        fun String.toRows(): List<String> = split("\n")
    }
}

fun main() {
    val board = Board(INPUT)
    println(board.sumOfLoads())
}
