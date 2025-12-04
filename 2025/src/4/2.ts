import { INPUT_4 } from "@/src/4/input";

type Index = `${number},${number}`;
type IsPaperRoll = Map<Index, true>;

const vectors = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];

const isPaperRoll: IsPaperRoll = new Map();

const getNumPaperNeighbours = (posI: number, posJ: number): number => {
  let num = 0;

  for (const vector of vectors) {
    const [vI, vJ] = vector;
    const i = posI + vI;
    const j = posJ + vJ;

    if (isPaperRoll.get(`${i},${j}`)) num++;
  }

  return num;
};

const doSweep = (): number => {
  let total = 0;
  const toSweep: Index[] = [];

  for (const roll of isPaperRoll.keys()) {
    const [i, j] = roll.split(",").map(Number);
    const numPaperNeighbours = getNumPaperNeighbours(i, j);

    if (numPaperNeighbours < 4) {
      total++;
      toSweep.push(`${i},${j}`);
    }
  }

  for (const index of toSweep) {
    isPaperRoll.delete(index);
  }

  return total;
};

const run = (input: string) => {
  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      if (line[j] === "@") {
        isPaperRoll.set(`${i},${j}`, true);
      }
    }
  }

  let total = 0;

  while (true) {
    const swept = doSweep();
    total += swept;

    if (swept === 0) break;
  }

  console.log(total);
};

// 8184
run(INPUT_4);
