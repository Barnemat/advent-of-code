import { sum } from "@/src/utils/sum";
import { INPUT_7 } from "@/src/7/input";

const operators = ["+", "*", "|"] as const;

type Operator = (typeof operators)[number];

interface Line {
  testValue: number;
  numbers: number[];
}

const input: Line[] = INPUT_7.split("\n").map((item) => {
  const split = item.split(":");
  const testValue = parseInt(split[0]);
  const numbers = split[1]
    .split(" ")
    .splice(1)
    .map((num) => parseInt(num));

  return { testValue, numbers };
});

const numOperators = (str: string): number =>
  str.split("").filter((char) => operators.includes(char as Operator)).length;

const getEquations = (line: Line): string[] => {
  const { numbers } = line;

  return numbers
    .reduce((acc: string[], num, index) => {
      if (index === 0) {
        acc.push(num.toString());
        return acc;
      }

      const prevStrings = acc.filter((str) => numOperators(str) === index - 1);

      for (const operator of operators) {
        for (const str of prevStrings) {
          switch (operator) {
            case "*":
              acc.push(`${str}*${num}`);
              break;
            case "+":
              acc.push(`${str}+${num}`);
              break;
            case "|":
              acc.push(`${str}|${num}`);
              break;
          }
        }
      }
      return acc;
    }, [])
    .filter((str) => str.length === numbers.join().length);
};

const evaluateEquation = (equation: string): number => {
  const parts = equation.split(/([+*|])/g);
  let result = parseInt(parts[0]);

  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const value = parts[i + 1];
    const valueInt = parseInt(value);

    switch (operator) {
      case "+":
        result += valueInt;
        break;
      case "*":
        result *= valueInt;
        break;
      case "|":
        result = parseInt(`${result}${value}`);
    }
  }

  return result;
};

const testResult = (line: Line): number => {
  const { testValue } = line;
  const equations = getEquations(line);

  const evaluations = equations.map((expression) =>
    evaluateEquation(expression),
  );

  const testValueEvals = evaluations.filter(
    (evaluation) => evaluation === testValue,
  );

  return testValueEvals.length > 0 ? testValue : 0;
};

const getSum = () => sum(...input.map(testResult));

console.log(getSum());
