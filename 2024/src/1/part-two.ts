import { INPUT_1 } from "@/src/1/input";

const list1: number[] = [];
const list2: number[] = [];

INPUT_1.forEach((line) => {
  const strings = line.split(" ").filter((str) => str !== "");
  const [str1, str2] = strings;
  list1.push(parseInt(str1));
  list2.push(parseInt(str2));
});

const calcSimilarity = (num: number): number => {
  let count = 0;

  list2.forEach((value) => {
    if (value === num) {
      count += 1;
    }
  });

  return num * count;
};

const totalSimilarity = (): number =>
  list1.reduce((acc: number, value: number) => acc + calcSimilarity(value), 0);

console.log(totalSimilarity());
