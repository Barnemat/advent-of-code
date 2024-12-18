import { INPUT_16 } from "@/src/16/input";
import { calcDistance } from "@/src/utils/calc-distance";
import { generateTwoDimensionalList } from "@/src/utils/two-dimensional-list";
import {
  generateTwoDimensionalMap,
  TwoDimensionalMap,
} from "@/src/utils/two-dimensional-map";

const input = generateTwoDimensionalList(INPUT_16);

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
] as const;

let end: [number, number] = [0, 0];

const dijkstra = () => {
  let start: [number, number] = [0, 0];
  const prev: TwoDimensionalMap<[number, number, number, number] | undefined> =
    {};

  const distances = generateTwoDimensionalMap(input, (char, i, j) => {
    prev[i] = prev[i] ?? {};
    prev[i][j] = undefined;

    if (char === "S") {
      start = [i, j];
      return 0;
    }

    if (char === "E") {
      end = [i, j];
    }

    return Infinity;
  });

  const queue: [number, number][] = [start];

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a[0]][a[1]] - distances[b[0]][b[1]]);

    const [x, y] = queue.shift()!;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX < 0 ||
        newX >= input.length ||
        newY < 0 ||
        newY >= input[0].length ||
        input[newX][newY] === "#"
      ) {
        continue;
      }

      const prevNode = prev[x][y] ?? [0, 0, 0, 1];

      const initNewDistance = distances[x][y];

      let newDistance = 0;

      const distX = calcDistance(prevNode[2], dx);
      const distY = calcDistance(prevNode[3], dy);

      if (distX > 1 || distY > 1) {
        newDistance = Infinity;
      }

      if (prevNode[2] === dx && prevNode[3] === dy) {
        newDistance = initNewDistance + 1;
      } else {
        newDistance = initNewDistance + 1001;
      }

      if (newDistance < distances[newX][newY]) {
        distances[newX][newY] = newDistance;
        prev[newX][newY] = [x, y, dx, dy];
        queue.push([newX, newY]);
      }
    }
  }

  return [distances, prev];
};

console.log(dijkstra()[0][end[0]][end[1]]);
