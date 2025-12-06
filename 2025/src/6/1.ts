import { INPUT_6 } from "@/src/6/input";
import { sum } from "@/src/utils/sum";

const run = (input: string) => {
  let expressions: string[] = [];

  const lines = input.split("\n");
  const rows = lines.map((line) => line.split(/\s+/).filter(Boolean));

  const operators = rows[rows.length - 1];
  const numberRows = rows.slice(0, -1);

  for (let col = 0; col < operators.length; col++) {
    const nums = numberRows.map((row) => row[col]);
    const expression = nums.join(` ${operators[col]} `);
    expressions.push(expression);
  }

  console.log(sum(...expressions.map(eval)));
};

run(INPUT_6);
