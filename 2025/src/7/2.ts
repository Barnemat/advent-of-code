import { INPUT_7 } from "@/src/7/input";
import { sum } from "@/src/utils/sum";

const run = (input: string) => {
  const beams = new Map<number, number>();

  for (const line of input.split("\n")) {
    const chars = line.split("");

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      if (char === "S") {
        beams.set(i, 1);
        break;
      }

      if (char === "^" && beams.has(i)) {
        const here = beams.get(i)!;
        const left = beams.get(i - 1) ?? 0;
        const right = beams.get(i + 1) ?? 0;

        beams.set(i - 1, left + here);
        beams.set(i + 1, right + here);
        beams.delete(i);
      }
    }
  }

  console.log(sum(...beams.values()));
};

run(INPUT_7);
