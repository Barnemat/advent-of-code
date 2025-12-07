import { INPUT_7 } from "@/src/7/input";

const run = (input: string) => {
  const beams = new Set<number>();
  let breaks = 0;

  for (const line of input.split("\n")) {
    const chars = line.split("");

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      if (char === "S") {
        beams.add(i);
        break;
      }

      if (char === "^" && beams.has(i)) {
        beams.add(i - 1);
        beams.add(i + 1);
        beams.delete(i);
        breaks++;
      }
    }
  }

  console.log(breaks);
};

run(INPUT_7);
