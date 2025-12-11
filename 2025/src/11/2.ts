import { INPUT_11 } from "@/src/11/input";
import { sum } from "@/src/utils/sum";
import memoize from "memoize";

const parseInput = (input: string): Map<string, string[]> => {
  const lines = new Map();

  input.split("\n").forEach((line) => {
    const [key, valueStrings] = line.split(": ");
    const values = valueStrings.split(" ");
    lines.set(key, values);
  });

  return lines;
};

const lines = parseInput(INPUT_11);

// With memoize cheat codes
const exploreNode = memoize(
  (from: string, dac: boolean = false, fft: boolean = false): number => {
    const nodesToExplore = lines.get(from);

    if (from === "out" || !nodesToExplore) {
      if (dac && fft) return 1;

      return 0;
    }

    return sum(
      ...nodesToExplore.map((node) =>
        exploreNode(node, dac || node === "dac", fft || node === "fft"),
      ),
    );
  },
  {
    cacheKey: (arguments_) => arguments_.join(),
  },
);

console.log(exploreNode("svr"));
