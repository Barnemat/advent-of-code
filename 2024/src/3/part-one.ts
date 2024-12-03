import { INPUT_3 } from "@/src/3/input";

const mainRegex = /mul\(\d{1,3},\d{1,3}\)/g;

const matches = INPUT_3.match(mainRegex);

const numberRegex = /\d{1,3},\d{1,3}/g;

const multiply = (input: string): number => {
  const [num1, num2] = input
    .match(numberRegex)![0]
    .split(",")
    .map((num) => parseInt(num));

  return num1 * num2;
};

const getResult = (): number =>
  matches?.reduce((acc: number, match: string) => acc + multiply(match), 0) ??
  0;

console.log(getResult());
