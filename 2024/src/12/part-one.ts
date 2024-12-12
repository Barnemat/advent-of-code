import { INPUT_12 } from "@/src/12/input";
import { generateTwoDimensionalList } from "@/src/utils/two-dimensional-list";
import {
  generateTwoDimensionalMap,
  TwoDimensionalMap,
} from "@/src/utils/two-dimensional-map";

type PlantRegion = {
  char: string;
  perimeter: number;
  area: number;
};

const inputList = generateTwoDimensionalList(INPUT_12);

const inputMap = generateTwoDimensionalMap(inputList, (char) => char);

const visited: TwoDimensionalMap<true> = {};

const floodFill = (i: number, j: number): PlantRegion | null => {
  if (visited[i]?.[j]) {
    return null;
  }

  const char = inputMap[i][j];
  const queue: [number, number][] = [[i, j]];
  let perimeter = 0;
  let area = 0;

  while (queue.length > 0) {
    const [i, j] = queue.shift()!;
    const node: string | undefined = inputMap[i]?.[j];

    if (node !== char) perimeter++;

    if (!node || visited[i]?.[j] || node !== char) {
      continue;
    }

    visited[i] = { ...visited[i], [j]: true };
    area++;

    queue.push([i - 1, j]);
    queue.push([i + 1, j]);
    queue.push([i, j - 1]);
    queue.push([i, j + 1]);
  }

  return { perimeter, area, char };
};

const calculatePrice = (): number => {
  let price = 0;

  for (let i = 0; i < inputList.length; i++) {
    for (let j = 0; j < inputList[i].length; j++) {
      const region = floodFill(i, j);

      if (region) {
        price += region.perimeter * region.area;
      }
    }
  }

  return price;
};

console.log(calculatePrice());
