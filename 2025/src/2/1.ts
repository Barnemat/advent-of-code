import { INPUT_2 } from "@/src/2/input";

const parseInput = (input: string): [number, number][] =>
  input.split(",").map((interval) => interval.split("-").map(Number)) as any;

const computeInterval = (interval: [number, number]): number => {
  const [min, max] = interval;
  let sum = 0;

  for (let i = min; i <= max; i++) {
    const str = String(i);

    if (str.length % 2 > 0) continue;

    const firstHalf = str.substring(0, str.length / 2);
    const secondHalf = str.substring(str.length / 2);

    if (firstHalf === secondHalf) sum += i;
  }

  return sum;
};

const run = () => {
  let sum = 0;

  for (const interval of parseInput(INPUT_2)) {
    sum += computeInterval(interval);
  }

  console.log(sum);
};

run();
