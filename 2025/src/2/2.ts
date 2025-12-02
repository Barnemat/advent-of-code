import { INPUT_2 } from "@/src/2/input";

const parseInput = (input: string): [number, number][] =>
  input.split(",").map((interval) => interval.split("-").map(Number)) as any;

const hasConsecutiveMatches = (str: string, testPattern: string): boolean =>
  new RegExp(`^(?:${testPattern})+$`).test(str);

const isInvalid = (id: number): boolean => {
  const str = String(id);
  const basePartition = str.split("");
  const testPatterns: string[] = [];

  for (let i = 0; i <= basePartition.length; i++) {
    const testPattern = basePartition.slice(i).join("");

    if (
      testPattern.length > 0 &&
      testPattern.length < basePartition.length &&
      testPattern[0] !== "0"
    ) {
      testPatterns.push(testPattern);
    }
  }

  for (const testPattern of testPatterns) {
    if (hasConsecutiveMatches(str, testPattern)) {
      return true;
    }
  }

  return false;
};

const computeInterval = (interval: [number, number]): number => {
  const [min, max] = interval;
  let sum = 0;

  for (let i = min; i <= max; i++) {
    if (isInvalid(i)) {
      sum += i;
    }
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

// 20077272987
run();
