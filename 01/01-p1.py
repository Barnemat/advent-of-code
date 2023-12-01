import re


def get_num_for_line(line):
    numbers = re.sub('\D', '', line)
    return int(numbers[0] + numbers[-1])


def get_sum_for_lines(lines):
    return sum(get_num_for_line(line) for line in lines)


def get_sum_for_file():
    with open('./input.txt') as f:
        return get_sum_for_lines(f)


print(get_sum_for_file())
