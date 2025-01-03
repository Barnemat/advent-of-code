import { INPUT_10 } from "@/src/10/input";
import { sum } from "@/src/utils/sum";
import { generateTwoDimensionalList } from "@/src/utils/two-dimensional-list";
import {
  generateTwoDimensionalMap,
  TwoDimensionalMap,
} from "@/src/utils/two-dimensional-map";

const input = generateTwoDimensionalList(INPUT_10);

const inputMap = generateTwoDimensionalMap(input, (value) => +value);

const traverseFrom = (
  i: number,
  j: number,
  visited: TwoDimensionalMap<boolean>,
  prevVal?: number,
): number => {
  if (visited[i]?.[j]) {
    return 0;
  }

  const value = inputMap[i]?.[j];

  if (value === undefined || (prevVal !== undefined && value !== prevVal + 1)) {
    return 0;
  }

  visited[i] = { ...(visited[i] || {}), [j]: true };

  if (value === 9) {
    return 1;
  }

  return sum(
    traverseFrom(i - 1, j, visited, value),
    traverseFrom(i, j - 1, visited, value),
    traverseFrom(i + 1, j, visited, value),
    traverseFrom(i, j + 1, visited, value),
  );
};

const getNumberOfPaths = (): number => {
  let res = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "0") {
        res += traverseFrom(i, j, {});
      }
    }
  }

  return res;
};

console.log(getNumberOfPaths());
