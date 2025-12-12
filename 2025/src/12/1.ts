import { INPUT_12 } from "@/src/12/input";
import { sum } from "@/src/utils/sum";

type Gift = [number, number][];
type Gifts = Gift[];

interface Region {
  dimensions: {
    x: number;
    y: number;
  };
  quantities: number[];
}
type Regions = Region[];

const parseInput = (input: string): [Gifts, Regions] => {
  const [giftsPart, regionsPart] = input.split(/\n\n(?=\d+x\d+)/);

  const gifts = giftsPart.split("\n\n").map((gift) =>
    gift
      .split("\n")
      .slice(1)
      .flatMap((line, i) =>
        line.split("").reduce((acc: [number, number][], char, j) => {
          if (char === "#") acc.push([i, j]);
          return acc;
        }, []),
      ),
  );

  const regions: Region[] = regionsPart.split("\n").map((region) => {
    const [dimensionPart, quantitiesPart] = region.split(": ");
    const [x, y] = dimensionPart.split("x").map(Number);
    const dimensions = {
      x,
      y,
    };
    const quantities = quantitiesPart.split(" ").map(Number);

    return { dimensions, quantities };
  });

  return [gifts, regions];
};

const run = (input: string) => {
  const [gifts, regions] = parseInput(input);

  console.log(
    regions.filter(({ dimensions: { x, y }, quantities }) => {
      const threeByThreeArea = Math.floor(x / 3) * Math.floor(y / 3);
      const allCanFitLoosely = sum(...quantities) <= threeByThreeArea;

      const area = x * y;
      const giftAreas = sum(
        ...gifts.map((gift, i) => gift.length * quantities[i]),
      );

      return allCanFitLoosely || giftAreas <= area;
    }).length,
  );
};

// DIRTY - Does not work for example input.
run(INPUT_12);
