export const sum = (...numbers: (string | number)[]): number => {
  return numbers.reduce(
    (acc: number, val) => (typeof val === "string" ? acc + +val : acc + val),
    0,
  );
};
