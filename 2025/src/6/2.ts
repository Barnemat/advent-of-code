import { INPUT_6 } from "@/src/6/input";
import { sum } from "@/src/utils/sum";

const groupExpressionsByColumns = (input: string): string[][][] => {
  const lines = input.split("\n");
  const maxLength = lines[0].length;

  const boundaries = [-1];
  for (let col = 0; col < maxLength; col++) {
    if (lines.every((line) => line[col] === " ")) {
      boundaries.push(col);
    }
  }

  boundaries.push(maxLength);

  return boundaries
    .slice(0, -1)
    .map((start, i) => [start + 1, boundaries[i + 1]])
    .filter(([start, end]) => start < end)
    .map(([start, end]) =>
      lines.map((line) => line.slice(start, end).split("")),
    );
};

const run = (input: string) => {
  let expressions: string[] = [];

  const groups = groupExpressionsByColumns(input);

  for (const group of groups) {
    const operator = group[group.length - 1].find((char) => char !== " ");
    let expression = "";

    for (let pos = group[0].length - 1; pos >= 0; pos--) {
      let num = "";

      for (let j = 0; j < group.length - 1; j++) {
        num += group[j][pos].trim();
      }

      expression += pos > 0 ? `${num} ${operator} ` : num;
    }

    expressions.push(expression);
  }

  console.log(sum(...expressions.map(eval)));
};

run(INPUT_6);
