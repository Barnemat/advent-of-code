import { INPUT_5 } from "@/src/5/input";

type Ranges = [number, number][];

const mergeRanges = (ranges: Ranges): Ranges => {
  while (true) {
    const prevLength = ranges.length;
    for (let i = 0; i < ranges.length; i++) {
      for (let j = 0; j < ranges.length; j++) {
        if (i === j) continue;

        const [min1, max1] = ranges[i];
        const [min2, max2] = ranges[j];

        if (min1 <= max2 && min2 <= max1) {
          ranges = ranges.filter((_, index) => index !== i && index !== j);
          ranges.push([Math.min(min1, min2), Math.max(max1, max2)]);
        }
      }
    }
    if (prevLength === ranges.length) break;
  }

  return ranges;
};

const run = (input: string) => {
  const parts = input.split("\n\n");
  const ranges = mergeRanges(
    parts[0].split("\n").map((range) => range.split("-").map(Number)) as Ranges,
  );

  let total = 0;

  for (const [min, max] of ranges) {
    total += max - min + 1;
  }

  console.log(total);
};

// 352556672963116
run(INPUT_5);
