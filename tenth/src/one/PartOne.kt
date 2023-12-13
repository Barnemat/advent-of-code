package one

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
    private var prevNeighbour: Tile? = null

    fun setPrevNeighbour(prev: Tile) {
        prevNeighbour = prev
    }

    fun getPrevNeighbour(): Tile? = prevNeighbour
}

class BoardBuilder(
    private val input: String
) {
    private val board: Board = buildBoard()

    private fun buildBoard(): Board {
        val visitedNodes: MutableList<Pair<Int, Int>> = mutableListOf()

        val tileMap = input
            .toCharMap()
            .toTiles()

        val startTile = tileMap
            .find { 'S' in it.map(Tile::symbol) }
            ?.find { it.symbol == 'S' }!!

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

    fun mainLoopSize(): Int = getMainLoop().size / 2

    private fun getMainLoop(): List<TileWithNeighbours> = buildList {
        board.forEach { row ->
            row.forEach { tileWithNeighbours ->
                if (tileWithNeighbours.getPrevNeighbour() != null && tileWithNeighbours !in this) {
                    add(tileWithNeighbours)
                }
            }
        }
    }

    companion object {
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
    println(boardBuilder.mainLoopSize())
}
