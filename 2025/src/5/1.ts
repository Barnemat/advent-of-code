import { INPUT_5 } from "@/src/5/input";

type Ranges = [number, number][];

const ingredientInAnyRange = (ingredient: number, ranges: Ranges): boolean => {
  for (const [min, max] of ranges) {
    if (ingredient >= min && ingredient <= max) return true;
  }

  return false;
};

const run = (input: string) => {
  const parts = input.split("\n\n");
  const ranges = parts[0]
    .split("\n")
    .map((range) => range.split("-").map(Number)) as Ranges;

  const ingredients = parts[1].split("\n").map(Number);

  console.log(
    ingredients.filter((ingredient) => ingredientInAnyRange(ingredient, ranges))
      .length,
  );
};

run(INPUT_5);
