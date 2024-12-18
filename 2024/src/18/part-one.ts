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

console.log(dijkstra(generateMatrix(70, 1024))[0][70][70]);
