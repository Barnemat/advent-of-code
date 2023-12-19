package two

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

data class Lens(
    val label: String,
    val operation: Char,
    val focalLength: Int?
) {
    override fun equals(other: Any?): Boolean =
        other is Lens && other.label == label

    override fun hashCode(): Int {
        return Hasher.hash(label)
    }
}

class StepRunner(input: String) {
    private val steps = input.getSteps()

    fun getSumOfFocusingPowers(): Int {
        var sum = 0

        runSteps().forEachIndexed { i, steps ->
            sum += getSumOfFocusingPowers(i, steps)
        }

        return sum
    }

    private fun getSumOfFocusingPowers(box: Int, list: List<Lens>): Int {
        var sum = 0

        list.forEachIndexed { i, step ->
            sum += getFocusingPower(box, i, step)
        }

        return sum
    }

    private fun getFocusingPower(box: Int, slot: Int, lens: Lens): Int =
        (box + 1) * (slot + 1) * (lens.focalLength ?: 0)

    private fun runSteps(): List<List<Lens>>  {
        val list: MutableList<MutableList<Lens>> = mutableListOf()
        (0..255).forEach { _ -> list.add(mutableListOf()) }

        steps.forEach {
            with (list[it.hashCode()]) {
                if (it in this) {
                    if (it.operation == '-') {
                        remove(it)
                    } else {
                        val index = indexOf(it)
                        remove(it)
                        add(index, it)
                    }
                } else {
                    if (it.operation == '=') add(it)
                }
            }
        }

        return list
    }

    companion object {
        fun String.getSteps(): List<Lens> = split(",")
            .map {
                val operation = Regex("[-=]").find(it)!!
                val label = it.substring(0, operation.range.first)
                val focalLength = if (it.lastIndex != operation.range.last) {
                    it.substring(operation.range.last + 1)
                } else null

                Lens(
                    focalLength = focalLength?.toInt(),
                    label = label,
                    operation = operation.value[0]
                )
            }
    }
}

fun main() {
    val stepRunner = StepRunner(INPUT)
    println(stepRunner.getSumOfFocusingPowers())
}
