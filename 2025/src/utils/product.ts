export const product = (...numbers: (string | number)[]): number =>
  numbers.reduce(
    (acc: number, val) => acc * (typeof val === "string" ? Number(val) : val),
    1,
  );
