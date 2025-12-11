import { INPUT_11 } from "@/src/11/input";
import { sum } from "@/src/utils/sum";

const input =
  "aaa: you hhh\n" +
  "you: bbb ccc\n" +
  "bbb: ddd eee\n" +
  "ccc: ddd eee fff\n" +
  "ddd: ggg\n" +
  "eee: out\n" +
  "fff: out\n" +
  "ggg: out\n" +
  "hhh: ccc fff iii\n" +
  "iii: out";

const parseInput = (input: string): Map<string, string[]> => {
  const lines = new Map();

  input.split("\n").forEach((line) => {
    const [key, valueStrings] = line.split(": ");
    const values = valueStrings.split(" ");
    lines.set(key, values);
  });

  return lines;
};

const exploreNode = (lines: Map<string, string[]>, from: string): number => {
  const nodesToExplore = lines.get(from)!;
  if (from === "out") return 1;

  return sum(...nodesToExplore.map((node) => exploreNode(lines, node)));
};

const run = (input: string) => {
  const lines = parseInput(input);
  console.log(exploreNode(lines, "you"));
};

run(INPUT_11);
