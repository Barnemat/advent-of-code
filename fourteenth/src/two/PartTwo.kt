package two

import INPUT

enum class Direction {
    NORTH,
    WEST,
    SOUTH,
    EAST;

    fun doCycle(board: MutableList<MutableList<Char>>) {
        when (this) {
            NORTH -> board.northCycle()
            SOUTH -> board.southCycle()
            EAST -> board.eastCycle()
            WEST -> board.westCycle()
        }
    }

    private fun MutableList<MutableList<Char>>.onXCycleRocks(reverse: Boolean = false) {
        forEachIndexed { rowIndex, row ->
            var cubeOrLastOIndex = if (reverse) row.size else -1

            (if (reverse) row.indices.reversed() else row.indices).forEach { colIndex ->
                val char = this[rowIndex][colIndex]

                if (char == '#') cubeOrLastOIndex = colIndex
                if (char == 'O') {
                    cubeOrLastOIndex = if (reverse) cubeOrLastOIndex - 1 else cubeOrLastOIndex + 1
                    this[rowIndex][colIndex] = '.'
                    this[rowIndex][cubeOrLastOIndex] = 'O'
                }
            }
        }
    }

    private fun MutableList<MutableList<Char>>.onYCycleRock(reverse: Boolean = false) {
        first().indices.forEach { colIndex ->
            var cubeOrLastOIndex = if (reverse) size else -1

            (if (reverse) indices.reversed() else indices).forEach { rowIndex ->
                val char = this[rowIndex][colIndex]

                if (char == '#') cubeOrLastOIndex = rowIndex
                if (char == 'O') {
                    cubeOrLastOIndex = if (reverse) cubeOrLastOIndex - 1 else cubeOrLastOIndex + 1
                    this[rowIndex][colIndex] = '.'
                    this[cubeOrLastOIndex][colIndex] = 'O'
                }
            }
        }
    }

    private fun MutableList<MutableList<Char>>.northCycle() = onYCycleRock()
    private fun MutableList<MutableList<Char>>.eastCycle() = onXCycleRocks(reverse = true)
    private fun MutableList<MutableList<Char>>.southCycle() = onYCycleRock(reverse = true)
    private fun MutableList<MutableList<Char>>.westCycle() = onXCycleRocks()
}

class Board(input: String) {
    private val board = input.toBoard()
    private val boardStringToCycleNum: MutableMap<String, Int> = mutableMapOf()

    fun getLoadAfterCycles(n: Int): Int {
        repeat(n) { run ->
            val boardString = transformBoardToString()

            if (boardString in boardStringToCycleNum) {
                val lastHitDiff = run - boardStringToCycleNum[boardString]!!
                val doCycles = (n - run) % lastHitDiff

                repeat(doCycles) {
                    runCycle()
                }

                return board.mapIndexed { i, row ->
                    row.count { it == 'O' } * (board.size - i)
                }.sumOf { it }
            }

            boardStringToCycleNum[boardString] = run
            runCycle()
        }

        return 0
    }

    private fun runCycle() {
        Direction.entries.forEach { it.doCycle(board) }
    }

    private fun transformBoardToString(): String = board.joinToString("")

    companion object {
        fun String.toBoard(): MutableList<MutableList<Char>> = split("\n")
            .map { str -> str.map{ it }.toMutableList() }.toMutableList()
    }
}

fun main() {
    val board = Board(INPUT)
    println(board.getLoadAfterCycles(1000000000))
}

