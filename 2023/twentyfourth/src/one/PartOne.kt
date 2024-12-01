package one

private val TEST_INPUT = """
    19, 13, 30 @ -2,  1, -2
    18, 19, 22 @ -1, -1, -2
    20, 25, 34 @ -2, -2, -4
    12, 31, 28 @ -1, -2, -1
    20, 19, 15 @  1, -5, -3
""".trimIndent()

data class Vector(
    val x: Long,
    val y: Long,
    val z: Long
) {

    companion object {
        fun intersects(v1: Vector, v2: Vector): Pair<Long, Long> {
            
        }
    }
}