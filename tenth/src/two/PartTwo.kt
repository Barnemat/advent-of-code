package two

import INPUT

typealias Board = List<List<TileWithNeighbours>>

enum class Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

private val connectableSymbols: Map<Char, Map<Direction, List<Char>>> = mapOf(
    '|' to mapOf(
        Direction.NORTH to listOf('7', 'F', '|'),
        Direction.SOUTH to listOf('L', 'J', '|')
    ),
    '-' to mapOf(
        Direction.EAST to listOf('J', '7', '-'),
        Direction.WEST to listOf('L', 'F', '-')
    ),
    'L' to mapOf(
        Direction.NORTH to listOf('|', 'F', '7'),
        Direction.EAST to listOf('-', '7', 'J')
    ),
    'J' to mapOf(
        Direction.WEST to listOf('-', 'F', 'L'),
        Direction.NORTH to listOf('|', 'F', '7')
    ),
    '7' to mapOf(
        Direction.SOUTH to listOf('|', 'J', 'L'),
        Direction.WEST to listOf('-', 'F', 'L')
    ),
    'F' to mapOf(
        Direction.SOUTH to listOf('L', 'J', '|'),
        Direction.EAST to listOf('-', '7', 'J')
    ),
    'S' to mapOf(
        Direction.NORTH to listOf('7', 'F', '|'),
        Direction.SOUTH to listOf('L', 'J', '|'),
        Direction.EAST to listOf('J', '7', '-'),
        Direction.WEST to listOf('L', 'F', '-')
    ),
)

open class Tile(
    val symbol: Char,
    val indices: Pair<Int, Int>,
) {
    private val first = indices.first
    private val second = indices.second

    private fun directionIsValid(
        direction: Direction,
        visitedNodes: List<Pair<Int, Int>>,
        tileMap: List<List<Tile>>
    ): Boolean {
        val connectableSymbolsByDirection = connectableSymbols[symbol] ?: return false
        val validSymbols = connectableSymbolsByDirection[direction] ?: return false
        val (nextI, nextJ) = getIndexFromDirection(direction)
        val nextElement = tileMap[nextI][nextJ]

        return if (nextElement.indices !in visitedNodes) nextElement.symbol in validSymbols else false
    }

    private fun getIndexFromDirection(
        direction: Direction
    ): Pair<Int, Int> = when (direction) {
        Direction.EAST -> first to second + 1
        Direction.WEST -> first to second - 1
        Direction.NORTH -> first - 1 to second
        Direction.SOUTH -> first + 1 to second
    }

    fun getValidIndex(
        visitedNodes: List<Pair<Int, Int>>,
        tileMap: List<List<Tile>>
    ): Pair<Int, Int>? = Direction
        .entries
        .filter { directionIsValid(it, visitedNodes, tileMap) }
        .find { getIndexFromDirection(it) !in visitedNodes }
        ?.let(::getIndexFromDirection)
}

class TileWithNeighbours(
    symbol: Char,
    indices: Pair<Int, Int>,
) : Tile(symbol, indices) {
    private var prevNeighbour: TileWithNeighbours? = null

    fun setPrevNeighbour(prev: TileWithNeighbours) {
        prevNeighbour = prev
    }

    fun getPrevNeighbour(): TileWithNeighbours? = prevNeighbour
}

class BoardBuilder(
    private val input: String
) {
    private val board: Board = buildBoard()

    fun numOfEnclosedTiles(): Int {
        val clockwiseFromSource = sortedCounterClockwiseFromSource()
        val shoelace = shoelaceArea(clockwiseFromSource)
        val numPointsWithin = shoelace - mainLoopSize() + 1

        return numPointsWithin
    }

    private fun buildBoard(): Board {
        val visitedNodes: MutableList<Pair<Int, Int>> = mutableListOf()

        val tileMap = input
            .toCharMap()
            .toTiles()

        val startTile = tileMap.findSource()

        var prevTile = startTile

        do {
            val updatedIndices = prevTile.getValidIndex(visitedNodes, tileMap) ?: break
            val (first, second) = updatedIndices
            val nexTile = tileMap[first][second]

            nexTile.setPrevNeighbour(prevTile)
            visitedNodes.add(prevTile.indices)
            prevTile = nexTile
        } while (prevTile.symbol != 'S')

        startTile.setPrevNeighbour(prevTile)

        return tileMap
    }

    private fun sortedCounterClockwiseFromSource(): List<Tile> = buildList {
        val source = board.findSource()

        var next: TileWithNeighbours? = source
        do {
            if (next == null) break

            add(next)
            next = next.getPrevNeighbour()
        } while (next != source)
    }

    private fun cross(p1: Pair<Int, Int>, p2: Pair<Int, Int>): Int =
        (p1.first * p2.second) - (p1.second * p2.first)

    private fun shoelaceArea(loop: List<Tile>): Int {
        var sum = 0

        for (i in 1..<loop.size) {
            sum += cross(loop[i - 1].indices, loop[i].indices)
        }

        return (sum + cross(loop.last().indices, loop.first().indices)) / 2
    }

    private fun mainLoopSize(): Int = sortedCounterClockwiseFromSource().size / 2

    companion object {
        fun  List<List<TileWithNeighbours>>.findSource(): TileWithNeighbours = find {
            'S' in it.map(TileWithNeighbours::symbol)
        }?.find { it.symbol == 'S' }!!

        fun String.toCharMap(): List<List<Char>> = split("\n")
            .map { it.toList() }

        fun List<List<Char>>.toTiles(): List<List<TileWithNeighbours>> = mapIndexed { i, row ->
            row.mapIndexed { j, symbol ->
                TileWithNeighbours(
                    symbol = symbol,
                    indices = i to j,
                )
            }
        }
    }
}

fun main() {
    val boardBuilder = BoardBuilder(INPUT)
    println(boardBuilder.numOfEnclosedTiles())
}
