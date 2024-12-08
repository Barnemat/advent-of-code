import {
  generateTwoDimensionalMap,
  TwoDimensionalMap,
} from "@/src/utils/two-dimensional-map";
import { calcDistance } from "@/src/utils/calc-distance";
import { INPUT_8 } from "@/src/8/input";

const inputAsList = INPUT_8.split("\n").map((line) => line.split(""));

const inputMap: TwoDimensionalMap<string | undefined> =
  generateTwoDimensionalMap(
    inputAsList,
    (value) => (value !== "." ? value : undefined),
    true,
    true,
  );

const antennaTypes: string[] = [
  ...new Set(
    Object.values(inputMap).flatMap((value) => Object.values<string>(value)),
  ),
];

type Position = [number, number];

type AntennaToPositions = { [antenna: string]: [number, number][] };

const antennaTypesToPositions: AntennaToPositions = Object.entries(
  inputMap,
).reduce(
  (acc: AntennaToPositions, [i, row]: [string, Record<number, string>]) => {
    for (const [j, antennaType] of Object.entries(row)) {
      const prevValue = acc[antennaType];
      const position = [parseInt(i), parseInt(j)] as [number, number];
      acc[antennaType] = prevValue ? [...prevValue, position] : [position];
    }

    return acc;
  },
  {},
);

const isValidPosition = ([i, j]: Position): boolean =>
  i >= 0 && j >= 0 && i < inputAsList.length && j < inputAsList[0].length;

const findAntinodesForPair = (
  [pos1i, pos1j]: Position,
  [pos2i, pos2j]: Position,
): Position[] => {
  const [antI, antJ]: Position = [
    calcDistance(pos1i, pos2i),
    calcDistance(pos1j, pos2j),
  ];

  const [i1, i2] = [pos1i - antI, pos2i + antI];
  const [j1, j2] =
    pos1j > pos2j ? [pos1j + antJ, pos2j - antJ] : [pos1j - antJ, pos2j + antJ];

  const antinodePositions: Position[] = [
    [i1, j1],
    [i2, j2],
  ];

  return antinodePositions.filter(isValidPosition);
};

const calculateNumAntinodes = (): number => {
  let antinodes: Position[] = [];

  for (const antennaType of antennaTypes) {
    const positions = antennaTypesToPositions[antennaType];

    positions.forEach((position, index) => {
      for (let j = index + 1; j < positions.length; j++) {
        antinodes.push(...findAntinodesForPair(position, positions[j]));
      }
    });
  }

  const uniqueAntinodes = antinodes.reduce((acc: Position[], currentPos) => {
    if (
      acc.some((pos) => pos[0] === currentPos[0] && pos[1] === currentPos[1])
    ) {
      return acc;
    }

    return [...acc, currentPos];
  }, []);

  return uniqueAntinodes.length;
};

console.log(calculateNumAntinodes());
