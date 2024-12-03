import { INPUT_3 } from "@/src/3/input";

const dosRegex = /do\(\)/g;
const dontsRegex = /don't\(\)/g;

const getMatches = (regex: RegExp): number[] =>
  [...INPUT_3.matchAll(regex)].map((match) => match.index);

const cleanData = (): string => {
  const doIndices = getMatches(dosRegex);
  const dontIndices = getMatches(dontsRegex);

  let lastDontIndex = dontIndices.shift();
  let res = INPUT_3.slice(0, lastDontIndex);
  while (doIndices.length > 0) {
    let doIndex = doIndices.shift();

    if (!doIndex || !lastDontIndex) break;

    while (doIndex && doIndex < lastDontIndex) {
      doIndex = doIndices.shift();
    }

    let dontIndex = dontIndices.shift();

    while (doIndex && dontIndex && dontIndex < doIndex) {
      dontIndex = dontIndices.shift();
    }

    lastDontIndex = dontIndex;

    res += INPUT_3.slice(doIndex, dontIndex);
  }

  return res;
};

const numberRegex = /\d{1,3},\d{1,3}/g;

const multiply = (input: string): number => {
  const [num1, num2] = input
    .match(numberRegex)![0]
    .split(",")
    .map((num) => parseInt(num));

  return num1 * num2;
};

const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;

const matches = cleanData().match(mulRegex);

const getResult = (): number =>
  matches?.reduce((acc: number, match: string) => acc + multiply(match), 0) ??
  0;

console.log(getResult());
