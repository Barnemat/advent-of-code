import { INPUT_6 } from "@/src/6/input";
import { getVisitedNodes } from "@/src/6/part-one";

const input = INPUT_6.split("\n").map((row) => row.split(""));

const Direction = ["^", ">", "v", "<"] as const;

const directions = Direction as readonly string[];

type DirectionType = (typeof Direction)[number];

type Position = [number, number];

interface Guard {
  position: Position;
  direction: DirectionType;
}

const getInitGuardPosition = (): Guard => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const value = input[i][j];

      if (directions.includes(value)) {
        return { position: [i, j], direction: value as DirectionType };
      }
    }
  }

  return { position: [0, 0], direction: "^" as DirectionType };
};

const isObstacle = (position: Position, test?: Position) => {
  const [i, j] = position;
  if (i < 0 || j < 0 || i >= input.length || j >= input[0].length) {
    return false;
  }

  if (test && i === test[0] && j === test[1]) return true;

  return input[i][j] === "#";
};

const getIsObstacle = (test: Position) => (position: Position) =>
  isObstacle(position, test);

interface Visited {
  [i: string]: {
    [j: string]: DirectionType[];
  };
}

const initGuardPosition = getInitGuardPosition();

const testPath = (test: Position): boolean => {
  const isObstacle = getIsObstacle(test);

  let { position, direction } = initGuardPosition;

  let nextPosition: Position = position;
  const visitedNodes: Visited = {};

  while (true) {
    const [i, j] = nextPosition;

    switch (direction) {
      case "^":
        if (isObstacle([i - 1, j])) {
          direction = ">";
        } else {
          nextPosition = [i - 1, j];
        }
        break;
      case ">":
        if (isObstacle([i, j + 1])) {
          direction = "v";
        } else {
          nextPosition = [i, j + 1];
        }
        break;
      case "v":
        if (isObstacle([i + 1, j])) {
          direction = "<";
        } else {
          nextPosition = [i + 1, j];
        }
        break;
      case "<":
        if (isObstacle([i, j - 1])) {
          direction = "^";
        } else {
          nextPosition = [i, j - 1];
        }
        break;
    }

    if (
      nextPosition[0] < 0 ||
      nextPosition[1] < 0 ||
      nextPosition[0] >= input.length ||
      nextPosition[1] >= input[0].length
    ) {
      break;
    }

    const prevValue = visitedNodes[nextPosition[0]]?.[nextPosition[1]] || [];

    if (prevValue.includes(direction)) {
      return true;
    }

    visitedNodes[nextPosition[0]] = {
      ...visitedNodes[nextPosition[0]],
      [nextPosition[1]]: [...prevValue, direction],
    };
  }

  return false;
};

const testPossibleBlocks = (): number => {
  const visitedNodes = getVisitedNodes().filter(
    ([i, j]) =>
      initGuardPosition.position[0] !== i ||
      initGuardPosition.position[1] !== j,
  );

  let possible = 0;
  for (const test of visitedNodes) {
    if (testPath(test)) {
      possible++;
    }
  }

  return possible;
};

console.log(testPossibleBlocks());
