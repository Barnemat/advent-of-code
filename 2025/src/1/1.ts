import { INPUT_1 } from "@/src/1/input";

const MIN = 0;
const MAX = 99;

const run = (startsAt: number) => {
  let pointer = startsAt;
  let numZero = 0;

  for (const inst of INPUT_1) {
    const dir = inst[0];
    let amount = Number(inst.substring(1));

    while (amount-- > 0) {
      if (dir === "R") {
        pointer = pointer === MAX ? 0 : pointer + 1;
      } else {
        pointer = pointer === MIN ? MAX : pointer - 1;
      }
    }

    if (pointer === 0) numZero++;
  }

  return numZero;
};

console.log(run(50));
