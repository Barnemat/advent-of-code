import { INPUT_10 } from "@/src/10/input";
import { sum } from "@/src/utils/sum";

class Binary {
  constructor(
    private value: number,
    private width: number,
  ) {}

  static from(str: string): Binary {
    return new Binary(parseInt(str, 2), str.length);
  }

  toggleLeft(n: number): Binary {
    const pos = this.width - 1 - n;
    return new Binary(this.value ^ (1 << pos), this.width);
  }

  toNumber(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString(2).padStart(this.width, "0");
  }

  toAllOff(): string {
    return Array.from({ length: this.width }, () => "0").join("");
  }
}

interface Machine {
  endState: Binary;
  buttons: number[][];
  joltaVolts: number[];
}

const parseLine = (line: string): Machine => {
  const mainRegex = /^(\[.+?])\s+((?:\([^)]+\)\s*)+)\s*(\{[^}]+})$/;
  const match = line.match(mainRegex);

  if (!match) throw new Error("Invalid format");

  const endState = Binary.from(
    match[1].slice(1, -1).replaceAll(".", "0").replaceAll("#", "1"),
  );
  const buttons = [...match[2].matchAll(/\(([^)]+)\)/g)].map((m) =>
    m[1].split(",").map(Number),
  );
  const joltaVolts = match[3].slice(1, -1).split(",").map(Number);

  return { endState, buttons, joltaVolts };
};

const parseInput = (input: string): Machine[] =>
  input.split("\n").map(parseLine);

const calcMinNumButtonPresses = ({ endState, buttons }: Machine): number => {
  let presses = 0;
  const untriedStates = new Set([endState.toAllOff()]);

  while (untriedStates.size > 0) {
    presses++;

    const tryThisRun = new Set(untriedStates);

    for (const state of tryThisRun) {
      for (const button of buttons) {
        let binaryToggles = Binary.from(state);

        for (const toggle of button) {
          binaryToggles = binaryToggles.toggleLeft(toggle);
        }

        if (binaryToggles.toString() === endState.toString()) return presses;

        untriedStates.add(binaryToggles.toString());
      }

      untriedStates.delete(state);
    }
  }

  return presses;
};

const run = (input: string) => {
  const machines = parseInput(input);

  const sumButtons = sum(...machines.map(calcMinNumButtonPresses));
  console.log(sumButtons);
};

run(INPUT_10);
