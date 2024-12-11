import { INPUT_11 } from "@/src/11/input";

const input = INPUT_11.split(" ").map(Number);

const evolveStones = (
  initStones: number[],
  numGenerations: number,
): number[] => {
  let res: number[] = [];
  let workload: number[] = initStones;

  for (let i = 0; i < numGenerations; i++) {
    const genRes: number[] = [];

    while (workload.length > 0) {
      const stone = workload.shift();

      if (stone === undefined) break;

      if (stone === 0) {
        genRes.push(1);
        continue;
      }

      const stoneStr = String(stone);

      if (stoneStr.length % 2 === 0) {
        const half = stoneStr.length / 2;
        const [firstHalf, secondHalf] = [
          parseInt(stoneStr.substring(0, half)),
          parseInt(stoneStr.substring(half)),
        ];

        genRes.push(firstHalf, secondHalf);
        continue;
      }

      genRes.push(stone * 2024);
    }

    res = genRes;
    workload = genRes;
  }

  return res;
};

const numOfStonesAfter = (numGenerations: number): number =>
  evolveStones(input, numGenerations).length;

console.time("numOfStonesAfter");
console.log(numOfStonesAfter(25));
console.timeEnd("numOfStonesAfter");
