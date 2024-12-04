import { INPUT_4 } from "@/src/4/input";

const Distance = {
  M: 1,
  A: 0,
  S: 1,
} as const;

type DistanceType = keyof typeof Distance;

const input = INPUT_4.split("\n").map((line) => line.split(""));

const isPossibleDirection = (i: number, j: number): boolean => {
  const value = input[i][j];
  if (value !== "A") return false;

  const northEast = (checkFor: DistanceType) =>
    i > 0 && j < input[i].length - 1 && input[i - 1][j + 1] === checkFor;

  const northWest = (checkFor: DistanceType) =>
    i > 0 && j > 0 && input[i - 1][j - 1] === checkFor;

  const southEast = (checkFor: DistanceType) =>
    i < input.length - 1 &&
    j < input[i].length - 1 &&
    input[i + 1][j + 1] === checkFor;

  const southWest = (checkFor: DistanceType) =>
    i < input.length - 1 && j > 0 && input[i + 1][j - 1] === checkFor;

  return (
    ((southWest("S") && northEast("M")) ||
      (southWest("M") && northEast("S"))) &&
    ((southEast("S") && northWest("M")) || (southEast("M") && northWest("S")))
  );
};

const getXmasNums = (): number => {
  let num = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (isPossibleDirection(i, j)) {
        num++;
      }
    }
  }

  return num;
};

console.log(getXmasNums());
