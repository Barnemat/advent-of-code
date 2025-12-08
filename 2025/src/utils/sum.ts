export const sum = (...numbers: (string | number)[]): number =>
  numbers.reduce(
    (acc: number, val) => (typeof val === "string" ? acc + +val : acc + val),
    0,
  );
