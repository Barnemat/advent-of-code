import { INPUT_11 } from "@/src/11/input";
import { sum } from "@/src/utils/sum";

type Lines = Map<string, string[]>;
type SeenPaths = Map<string, number>;

const parseInput = (input: string): Lines => {
  const lines = new Map();

  input.split("\n").forEach((line) => {
    const [key, valueStrings] = line.split(": ");
    const values = valueStrings.split(" ");
    lines.set(key, values);
  });

  return lines;
};

const exploreNode = (
  lines: Lines,
  seenPaths: SeenPaths,
  from: string,
  dac: boolean = false,
  fft: boolean = false,
): number => {
  const seen = seenPaths.get(`${from}${dac}${fft}`);

  if (seen !== undefined) return seen;

  const nodesToExplore = lines.get(from);

  if (from === "out" || !nodesToExplore) {
    if (dac && fft) return 1;

    return 0;
  }

  const res = sum(
    ...nodesToExplore.map((node) =>
      exploreNode(
        lines,
        seenPaths,
        node,
        dac || node === "dac",
        fft || node === "fft",
      ),
    ),
  );

  seenPaths.set(`${from}${dac}${fft}`, res);

  return res;
};

const run = (input: string) => {
  const lines = parseInput(input);
  const seen = new Map<string, number>();

  console.log(exploreNode(lines, seen, "svr"));
};

run(INPUT_11);
