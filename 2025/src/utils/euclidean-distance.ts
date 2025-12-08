export const euclideanDistance = (a: number[], b: number[]): number =>
  Math.sqrt(a.reduce((sum, value, index) => sum + (value - b[index]) ** 2, 0));
