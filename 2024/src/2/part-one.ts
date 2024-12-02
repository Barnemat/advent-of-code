import { INPUT_2 } from "@/src/2/input";
import { calcDistance } from "@/src/utils/calc-distance";

const intervalIsSafe = ([num1, num2]: [number, number]): boolean => {
  const distance = calcDistance(num1, num2);

  return distance < 4 && distance > 0;
};

const getIsSafe = (line: string): boolean => {
  const report = line.split(" ").map((num) => parseInt(num));

  let decrease = false;
  let increase = false;

  for (let i = 0; i < report.length - 1; i += 1) {
    const interval: [number, number] = [report[i], report[i + 1]];

    if (!intervalIsSafe(interval)) {
      return false;
    }

    const intervalDir = interval[0] < interval[1] ? "increase" : "decrease";

    if (intervalDir === "increase") {
      increase = true;
    } else {
      decrease = true;
    }

    if (increase && decrease) {
      return false;
    }
  }

  return true;
};

const getSafeCount = (): number =>
  INPUT_2.reduce((acc: number, line: string) => {
    if (getIsSafe(line)) {
      acc++;
    }
    return acc;
  }, 0);

console.log(getSafeCount());
