import re

number_map = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}


def num_mapper(num):
    try:
        int(num)
        return num
    except ValueError:
        return number_map[num]


def get_num_for_line(line):
    numbers = re.findall('(?=(\d|one|two|three|four|five|six|seven|eight|nine))', line)
    return int(num_mapper(numbers[0]) + num_mapper(numbers[-1]))


def get_sum_for_lines(lines):
    return sum(get_num_for_line(line) for line in lines)


def get_sum_for_file():
    with open('input.txt') as f:
        return get_sum_for_lines(f)


print(get_sum_for_file())
