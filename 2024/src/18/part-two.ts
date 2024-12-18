import { INPUT_18 } from "@/src/18/input";
import {
  generateTwoDimensionalMap,
  TwoDimensionalMap,
} from "@/src/utils/two-dimensional-map";

const generateMatrix = (size: number, fallenBits: number): string[][] => {
  const coords = INPUT_18.split("\n")
    .slice(0, fallenBits)
    .map((line) => line.split(",").map(Number));

  const matrix = [];

  for (let i = 0; i < size + 1; i++) {
    const row = [];
    for (let j = 0; j < size + 1; j++) {
      const coord = coords.find(([x, y]) => x === j && y === i);

      if (coord) {
        row.push("#");
      } else if (i === 0 && j === 0) {
        row.push("S");
      } else if (i === size && j === size) {
        row.push("E");
      } else {
        row.push(".");
      }
    }
    matrix.push(row);
  }

  return matrix;
};

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
] as const;

const dijkstra = (input: string[][]) => {
  const start: [number, number] = [0, 0];
  const prev: TwoDimensionalMap<[number, number] | undefined> = {};

  const distances = generateTwoDimensionalMap(input, (char, i, j) => {
    prev[i] = prev[i] ?? {};
    prev[i][j] = undefined;

    if (char === "S") {
      return 0;
    }

    return Infinity;
  });

  const queue: [number, number][] = [start];

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a[0]][a[1]] - distances[b[0]][b[1]]);

    const [x, y] = queue.shift()!;

    if (input[x][y] === "#" && x === end && y === end) {
      distances[x][y] = Infinity;
      return [distances, prev];
    }

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

      const newDistance = distances[x][y] + 1;

      if (newDistance < distances[newX][newY]) {
        distances[newX][newY] = newDistance;
        prev[newX][newY] = [x, y];
        queue.push([newX, newY]);
      }
    }
  }

  return [distances, prev];
};

const end = 70;
const maxSteps = INPUT_18.length;

const binarySearch = () => {
  let range: [number, number] = [0, maxSteps];
  while (range[0] !== range[1]) {
    const mid = Math.floor((range[0] + range[1]) / 2);
    if (
      (dijkstra(generateMatrix(end, mid))[0] as TwoDimensionalMap<number>)[end][
        end
      ] === Infinity
    ) {
      range[1] = mid;
    } else {
      range[0] = mid + 1;
    }
  }

  const coords = INPUT_18.split("\n").map((line) =>
    line.split(",").map(Number),
  );

  return coords[range[0] - 1];
};

console.log(binarySearch());
