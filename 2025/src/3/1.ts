import { INPUT_3 } from "@/src/3/input";

const input =
  "987654321111111\n" +
  "811111111111119\n" +
  "234234234234278\n" +
  "818181911112111";

const getMax = (line: string): number => {
  let max = 0;
  let nextMax = 0;

  line.split("").forEach((numStr, index) => {
    const num = Number(numStr);

    if (num > max && index < line.length - 1) {
      max = num;
      nextMax = Number(line[index + 1]);
    } else if (num > nextMax) {
      nextMax = num;
    }
  });

  return Number(`${max}${nextMax}`);
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

console.log(getTotalOutput(input));
