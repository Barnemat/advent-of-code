import { INPUT_6 } from "@/src/6/input";

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

const isObstacle = (position: Position) => {
  const [i, j] = position;
  if (i < 0 || j < 0 || i >= input.length || j >= input[0].length) {
    return false;
  }

  return input[i][j] === "#";
};

export const getVisitedNodes = (): [number, number][] => {
  const initGuardPosition = getInitGuardPosition();

  let { position, direction } = initGuardPosition;

  let nextPosition: Position = position;
  const visitedNodes: [number, number][] = [];

  let numRuns = 0;

  while (true) {
    numRuns++;
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

    visitedNodes.push(nextPosition);
  }

  return visitedNodes.reduce((acc: [number, number][], curr) => {
    if (!acc.some((el) => el[0] === curr[0] && el[1] === curr[1])) {
      acc.push(curr);
    }
    return acc;
  }, []);
};

console.log(getVisitedNodes().length); // 4883
