import { INPUT_19 } from "@/src/19/input";

const input = INPUT_19.split("\n\n");
const keywords = input[0].split(", ");
const searchStrings = input[1].split("\n");

const countPossible = (searchString: string, keywords: string[]): number => {
  const size = searchString.length;
  const count = Array.from({ length: size + 1 }, () => 0);
  count[0] = 1;

  for (let i = 1; i < size + 1; i++) {
    for (const keyword of keywords) {
      const keywordSize = keyword.length;

      if (
        i >= keywordSize &&
        searchString.slice(i - keywordSize, i) === keyword
      ) {
        count[i] += count[i - keywordSize];
      }
    }
  }

  return count[size];
};

const countAll = (): number => {
  let result = 0;

  for (const searchString of searchStrings) {
    if (countPossible(searchString, keywords)) {
      result++;
    }
  }

  return result;
};

console.log(countAll());
