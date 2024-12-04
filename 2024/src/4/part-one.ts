import { INPUT_4 } from "@/src/4/input";

const Distance = {
  X: 0,
  M: 1,
  A: 2,
  S: 3,
} as const;

const Direction = [
  "northwest",
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
] as const;

type DirectionType = (typeof Direction)[number];

const input = INPUT_4.split("\n").map((line) => line.split(""));

const getDistanceLetterFromNum = (num: number) =>
  Object.entries(Distance).find(([, distance]) => distance === num)![0];

const isPossibleDirection = (
  direction: DirectionType,
  distance: number,
  i: number,
  j: number,
): boolean => {
  const value = input[i][j];
  const letter = getDistanceLetterFromNum(distance);

  if (value !== letter) {
    return false;
  }

  if (distance === Math.max(...Object.values(Distance))) {
    return true;
  }

  const nextDistance = distance + 1;

  switch (direction) {
    case "east":
      return (
        j < input[i].length - 1 &&
        isPossibleDirection(direction, nextDistance, i, j + 1)
      );
    case "north":
      return i > 0 && isPossibleDirection(direction, nextDistance, i - 1, j);
    case "northeast":
      return (
        i > 0 &&
        j < input[i].length - 1 &&
        isPossibleDirection(direction, nextDistance, i - 1, j + 1)
      );
    case "northwest":
      return (
        i > 0 &&
        j > 0 &&
        isPossibleDirection(direction, nextDistance, i - 1, j - 1)
      );
    case "south":
      return (
        i < input.length - 1 &&
        isPossibleDirection(direction, nextDistance, i + 1, j)
      );
    case "southeast":
      return (
        i < input.length - 1 &&
        j < input[i].length - 1 &&
        isPossibleDirection(direction, nextDistance, i + 1, j + 1)
      );
    case "southwest":
      return (
        i < input.length - 1 &&
        j > 0 &&
        isPossibleDirection(direction, nextDistance, i + 1, j - 1)
      );
    case "west":
      return j > 0 && isPossibleDirection(direction, nextDistance, i, j - 1);
  }
};

const getXmasNums = (): number => {
  let num = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      for (const direction of Direction) {
        if (isPossibleDirection(direction, 0, i, j)) {
          num++;
        }
      }
    }
  }

  return num;
};

console.log(getXmasNums());
