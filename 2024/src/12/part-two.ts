import { INPUT_12 } from "@/src/12/input";
import { generateTwoDimensionalList } from "@/src/utils/two-dimensional-list";
import {
  generateTwoDimensionalMap,
  TwoDimensionalMap,
} from "@/src/utils/two-dimensional-map";

type PlantRegion = {
  char: string;
  area: number;
  sides: number;
};

const inputList = generateTwoDimensionalList(INPUT_12);

const inputMap = generateTwoDimensionalMap(inputList, (char) => char);

const getIsCornerDirection = (
  dir1: string,
  dir2: string,
  dirDiagonal: string,
  char: string,
): boolean =>
  (char !== dir1 && char !== dir2) ||
  (char === dir1 && char === dir2 && char !== dirDiagonal);

const getNumCornerDirections = (i: number, j: number, char: string): number => {
  const left = inputMap[i][j - 1];
  const right = inputMap[i][j + 1];
  const top = inputMap[i - 1]?.[j];
  const bottom = inputMap[i + 1]?.[j];
  const diagonalTopLeft = inputMap[i - 1]?.[j - 1];
  const diagonalTopRight = inputMap[i - 1]?.[j + 1];
  const diagonalBottomLeft = inputMap[i + 1]?.[j - 1];
  const diagonalBottomRight = inputMap[i + 1]?.[j + 1];

  return [
    getIsCornerDirection(left, top, diagonalTopLeft, char),
    getIsCornerDirection(left, bottom, diagonalBottomLeft, char),
    getIsCornerDirection(right, top, diagonalTopRight, char),
    getIsCornerDirection(right, bottom, diagonalBottomRight, char),
  ].filter(Boolean).length;
};

const visited: TwoDimensionalMap<true> = {};

const floodFill = (i: number, j: number): PlantRegion | null => {
  if (visited[i]?.[j]) {
    return null;
  }

  const char = inputMap[i][j];
  const queue: [number, number][] = [[i, j]];
  let area = 0;
  let sides = 0;

  while (queue.length > 0) {
    const [i, j] = queue.shift()!;
    const node: string | undefined = inputMap[i]?.[j];

    if (!node || visited[i]?.[j] || node !== char) {
      continue;
    }

    sides += getNumCornerDirections(i, j, char);

    visited[i] = { ...visited[i], [j]: true };
    area++;

    queue.push([i - 1, j]);
    queue.push([i + 1, j]);
    queue.push([i, j - 1]);
    queue.push([i, j + 1]);
  }

  return { area, char, sides };
};

const calculatePrice = (): number => {
  let price = 0;

  for (let i = 0; i < inputList.length; i++) {
    for (let j = 0; j < inputList[i].length; j++) {
      const region = floodFill(i, j);

      if (region) {
        price += region.sides * region.area;
      }
    }
  }

  return price;
};

console.log(calculatePrice());
