import { INPUT_3 } from "@/src/3/input";

// With help from Vegard chap
const getMax = (line: string): number => {
  let leftToDrop = line.length - 12;
  const stack: string[] = [];
  for (const num of line) {
    while (
      leftToDrop > 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] < num
    ) {
      stack.pop();
      leftToDrop -= 1;
    }
    stack.push(num);
  }

  return Number(stack.slice(0, 12).join(""));
};

const getTotalOutput = (input: string): number => {
  const lines = input.split("\n");
  let total = 0;

  for (const line of lines) {
    const max = getMax(line);
    total += max;
  }

  return total;
};

console.log(getTotalOutput(INPUT_3));
