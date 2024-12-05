import { INPUT_5 } from "@/src/5/input";
import { sum } from "@/src/utils/sum";

const [rulesInput, updatesInput] = INPUT_5.split("\n\n");

type Rules = Record<string, string[]>;

const rules: Rules = rulesInput.split("\n").reduce((acc: Rules, rule) => {
  const [num1, num2] = rule.split("|");
  const prevValue = acc[num1] || [];

  acc[num1] = prevValue.concat(num2);

  return acc;
}, {});

type Updates = string[][];

const updates: Updates = updatesInput
  .split("\n")
  .map((update) => update.split(","));

const getInvalidUpdates = (): Updates => {
  let invalidUpdates = [];

  for (const update of updates) {
    let visitedNums = new Set<string>();

    for (const num of update) {
      const rule = rules[num];

      visitedNums.add(num);

      if (!rule) continue;

      if (rule.some((num) => visitedNums.has(num))) {
        invalidUpdates.push(update);
        break;
      }
    }
  }

  return invalidUpdates;
};

const getCorrectlySortedInvalidUpdatesNum = (
  invalidUpdates: Updates,
): number => {
  const validUpdates: Updates = [];

  for (const update of invalidUpdates) {
    const updated: string[] = [...update];

    for (const num of update) {
      const rule = rules[num];

      if (!rule) continue;

      const pastIndex = updated.indexOf(num);

      updated.splice(pastIndex, 1);

      const indicesToMoveBefore = rule
        .map((ruleNum) => updated.indexOf(ruleNum))
        .filter((index) => index !== -1)
        .sort((a, b) => a - b);

      if (indicesToMoveBefore.length === 0) {
        updated.splice(pastIndex, 0, num);
        continue;
      }

      updated.splice(indicesToMoveBefore[0], 0, num);
    }

    validUpdates.push(updated);
  }

  return sum(
    ...validUpdates.map((update) => update[Math.floor(update.length / 2)]),
  );
};

console.log(getCorrectlySortedInvalidUpdatesNum(getInvalidUpdates()));
