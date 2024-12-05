import { INPUT_5 } from "@/src/5/input";

const [rulesInput, updatesInput] = INPUT_5.split("\n\n");

type Rules = Record<string, string[]>;

const rules: Rules = rulesInput.split("\n").reduce((acc: Rules, rule) => {
  const [num1, num2] = rule.split("|");
  const prevValue = acc[num1] || [];

  acc[num1] = prevValue.concat(num2);

  return acc;
}, {});

const updates = updatesInput.split("\n").map((update) => update.split(","));

const getValidUpdatesNum = (): number => {
  let validUpdatesNum = 0;

  for (const update of updates) {
    let visitedNums = new Set<string>();
    let isValid = true;

    for (const num of update) {
      const rule = rules[num];

      visitedNums.add(num);

      if (!rule) continue;

      if (rule.some((num) => visitedNums.has(num))) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      validUpdatesNum += parseInt(update[Math.floor(update.length / 2)]);
    }
  }

  return validUpdatesNum;
};

console.log(getValidUpdatesNum());
