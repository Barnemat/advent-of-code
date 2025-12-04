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

const getNumPaperNeighbours = (
  posI: number,
  posJ: number,
  isPaperRoll: IsPaperRoll,
): number => {
  let num = 0;

  for (const vector of vectors) {
    const [vI, vJ] = vector;
    const i = posI + vI;
    const j = posJ + vJ;

    if (isPaperRoll.get(`${i},${j}`)) num++;
  }

  return num;
};

const run = (input: string) => {
  const isPaperRoll: IsPaperRoll = new Map();
  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const index = `${i},${j}` as const;
      if (line[j] === "@") {
        isPaperRoll.set(index, true);
      }
    }
  }

  let total = 0;
  for (const roll of isPaperRoll.keys()) {
    const [i, j] = roll.split(",").map(Number);
    const numPaperNeighbours = getNumPaperNeighbours(i, j, isPaperRoll);

    if (numPaperNeighbours < 4) total++;
  }

  console.log(total);
};

run(INPUT_4);
