import { INPUT_2 } from "@/src/2/input";
import { calcDistance } from "@/src/utils/calc-distance";

const intervalIsSafe = ([num1, num2]: [number, number]): boolean => {
  const distance = calcDistance(num1, num2);

  return distance < 4 && distance > 0;
};

const getIsSafeLine = (
  line: number[],
  indexToRemove: number | undefined,
): boolean => {
  const lineToUse =
    indexToRemove !== undefined ? line.toSpliced(indexToRemove, 1) : line;

  let decrease = false;
  let increase = false;

  for (let i = 0; i < lineToUse.length - 1; i += 1) {
    const interval: [number, number] = [lineToUse[i], lineToUse[i + 1]];

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

const getIsSafe = (report: number[]): boolean => {
  if (getIsSafeLine(report, undefined)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    if (getIsSafeLine(report, i)) {
      return true;
    }
  }

  return false;
};

const getSafeCount = (): number =>
  INPUT_2.reduce((acc: number, line: string) => {
    const report = line.split(" ").map((num) => parseInt(num));

    if (getIsSafe(report)) {
      acc++;
    }
    return acc;
  }, 0);

console.log(getSafeCount());
