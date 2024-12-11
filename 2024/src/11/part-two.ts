import { INPUT_11 } from "@/src/11/input";
import { sum } from "@/src/utils/sum";

const input = INPUT_11.split(" ").map(Number);

const evolveStones = (
  initStones: number[],
  numGenerations: number,
): Map<number, number> => {
  let lookup = new Map<number, number>(initStones.map((stone) => [stone, 1]));

  for (let i = 0; i < numGenerations; i++) {
    const genRes = new Map<number, number>();

    for (const [stone, num] of lookup) {
      if (stone === 0) {
        genRes.set(1, (genRes.get(1) ?? 0) + num);
        continue;
      }

      const stoneStr = String(stone);

      if (stoneStr.length % 2 === 0) {
        const half = stoneStr.length / 2;
        const [firstHalf, secondHalf] = [
          parseInt(stoneStr.substring(0, half)),
          parseInt(stoneStr.substring(half)),
        ];

        genRes.set(firstHalf, (genRes.get(firstHalf) ?? 0) + num);
        genRes.set(secondHalf, (genRes.get(secondHalf) ?? 0) + num);
        continue;
      }

      const times = stone * 2024;

      genRes.set(times, (genRes.get(times) ?? 0) + num);
    }

    lookup = genRes;
  }

  return lookup;
};

const numOfStonesAfter = (numGenerations: number): number =>
  sum(...[...evolveStones(input, numGenerations).values()]);

console.time("numOfStonesAfter");
console.log(numOfStonesAfter(75));
console.timeEnd("numOfStonesAfter");
