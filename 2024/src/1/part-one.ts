import { INPUT_1 } from "@/src/1/input";
import { calcDistance } from "@/src/utils/calc-distance";

const sumUpDistances = (): number => {
  const list1: number[] = [];
  const list2: number[] = [];

  INPUT_1.forEach((line) => {
    const strings = line.split(" ").filter((str) => str !== "");
    const [str1, str2] = strings;
    list1.push(parseInt(str1));
    list2.push(parseInt(str2));
  });

  list1.sort();
  list2.sort();

  return list1.reduce((acc: number, value: number, index: number) => {
    acc += calcDistance(value, list2[index]);
    return acc;
  }, 0);
};

console.log(sumUpDistances());
