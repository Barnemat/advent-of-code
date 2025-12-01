export const generateTwoDimensionalList = (
  input: string,
  splitRow: string = "\n",
  splitCol: string = "",
): string[][] => input.split(splitRow).map((row) => row.split(splitCol));
