package one

import INPUT

object Hasher {
    fun hash(string: String): Int {
        var currentValue = 0

        string.forEach {
            currentValue += it.code
            currentValue *= 17
            currentValue %= 256
        }

        return currentValue
    }

}

class HashRunner(input: String) {
    private val steps = input.getSteps()

    fun getHashSum(): Int = steps.sumOf { Hasher.hash(it) }

    companion object {
        fun String.getSteps(): List<String> = split(",")
    }
}

fun main() {
    val hashRunner = HashRunner(INPUT)
    println(hashRunner.getHashSum())
}
