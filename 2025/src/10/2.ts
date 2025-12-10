import { init } from "z3-solver";

import { INPUT_10 } from "@/src/10/input";
import { sum } from "@/src/utils/sum";

interface Machine {
  buttons: number[][];
  target: number[];
}

const parseLine = (line: string): Machine => {
  const mainRegex = /^(\[.+?])\s+((?:\([^)]+\)\s*)+)\s*(\{[^}]+})$/;
  const match = line.match(mainRegex);

  if (!match) throw new Error("Invalid format");

  const buttons = [...match[2].matchAll(/\(([^)]+)\)/g)].map((m) =>
    m[1].split(",").map(Number),
  );
  const target = match[3].slice(1, -1).split(",").map(Number);

  return { buttons, target };
};

const parseInput = (input: string): Machine[] =>
  input.split("\n").map(parseLine);

// Nope - I blatantly gave up on this one
// Luckily the subreddit knew that to give up means Z3: https://www.reddit.com/r/adventofcode/
// Let Microsoft do the work :-)
(async () => {
  console.time("time");
  const { Context } = await init();
  const Z3 = Context("main");

  const calcMinNumButtonPresses = async ({ buttons, target }: Machine) => {
    const presses = buttons.map((_, i) => Z3.Int.const(`x${i}`));
    const optimizer = new Z3.Optimize();

    for (const press of presses) {
      optimizer.add(Z3.GE(press, 0));
    }

    for (let slot = 0; slot < target.length; slot++) {
      const contributions = buttons.map((button, i) =>
        button.includes(slot) ? presses[i] : Z3.Int.val(0),
      );

      optimizer.add(
        Z3.Eq(
          contributions.reduce((a, b) => Z3.Sum(a, b)),
          target[slot],
        ),
      );
    }

    optimizer.minimize(presses.reduce((a, b) => Z3.Sum(a, b)));

    const result = await optimizer.check();
    if (result === "sat") {
      const model = optimizer.model();
      return sum(...presses.map((p) => Number(model.eval(p).toString())));
    }
    return 0;
  };

  const machines = parseInput(INPUT_10);

  let total = 0;
  for (const machine of machines) {
    total += await calcMinNumButtonPresses(machine);
  }
  console.log(total);

  console.timeEnd("time");
})();
