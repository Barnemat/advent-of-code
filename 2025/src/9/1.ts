import { INPUT_9 } from "@/src/9/input";

const run = (input: string) => {
  const lines = input.split("\n");

  let max = 0;
  for (const line of lines) {
    const [a1, a2] = line.split(",").map(Number);

    for (const line of lines) {
      const [b1, b2] = line.split(",").map(Number);

      const distX = Math.max(a1, b1) - Math.min(a1, b1) + 1;
      const distY = Math.max(a2, b2) - Math.min(a2, b2) + 1;
      const area = distX * distY;
      if (area > max) max = area;
    }
  }

  console.log(max);
};

run(INPUT_9);
