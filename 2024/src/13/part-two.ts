import { INPUT_13 } from "@/src/13/input";
import { sum } from "@/src/utils/sum";

const TEST_INPUT =
  "Button A: X+94, Y+34\n" +
  "Button B: X+22, Y+67\n" +
  "Prize: X=8400, Y=5400\n" +
  "\n" +
  "Button A: X+26, Y+66\n" +
  "Button B: X+67, Y+21\n" +
  "Prize: X=12748, Y=12176\n" +
  "\n" +
  "Button A: X+17, Y+86\n" +
  "Button B: X+84, Y+37\n" +
  "Prize: X=7870, Y=6450\n" +
  "\n" +
  "Button A: X+69, Y+23\n" +
  "Button B: X+27, Y+71\n" +
  "Prize: X=18641, Y=10279";

type XY = { X: number; Y: number };

type EquationValues = {
  A: XY;
  B: XY;
  Prize: XY;
};

const parseInput = (): EquationValues[] =>
  INPUT_13.split("\n\n").map((equation) => {
    const lines = equation.split("\n");

    return lines.reduce((acc: Partial<EquationValues>, line) => {
      const [unparsedKey, value] = line.split(": ");
      const key = (
        unparsedKey.startsWith("Button")
          ? unparsedKey.split(" ")[1]
          : unparsedKey
      ) as keyof EquationValues;

      if (key === "A" || key === "B") {
        const [X, Y] = value.split(", ").map((coord) => {
          const [_, number] = coord.split("+");
          return parseInt(number);
        });

        return { ...acc, [key]: { X, Y } };
      }

      const [X, Y] = value.split(", ").map((coord) => {
        const [_, number] = coord.split("=");
        return parseInt(number);
      });

      return { ...acc, Prize: { X, Y } };
    }, {} as Partial<EquationValues>) as EquationValues;
  });

const add = (xy: XY): XY => ({
  X: xy.X + 10000000000000,
  Y: xy.Y + 10000000000000,
});

const addToPriceOfEquation = (equation: EquationValues): EquationValues => ({
  ...equation,
  Prize: add(equation.Prize),
});

const getDenominator = (A: XY, B: XY): number => A.X * B.Y - A.Y * B.X;

const calculateEquation = (equationValues: EquationValues): number => {
  const { A, B, Prize } = addToPriceOfEquation(equationValues);

  const denominator = getDenominator(A, B);
  const num1 = getDenominator(B, Prize);
  const num2 = getDenominator(A, Prize);

  if (num1 % denominator === 0 && num2 % -denominator === 0) {
    return Math.abs((num1 / denominator) * 3 + num2 / -denominator);
  }

  return 0;
};

const calculateEquations = (): number =>
  sum(...parseInput().map(calculateEquation));

console.log(calculateEquations());
