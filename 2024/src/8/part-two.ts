import {
  generateTwoDimensionalMap,
  TwoDimensionalMap,
} from "@/src/utils/two-dimensional-map";
import { INPUT_8 } from "@/src/8/input";
import { calcDistance } from "@/src/utils/calc-distance";

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

const findAntinodesForPair = (
  [pos1i, pos1j]: Position,
  [pos2i, pos2j]: Position,
): Position[] => {
  const mainDistance: Position = [
    calcDistance(pos1i, pos2i),
    calcDistance(pos1j, pos2j),
  ];

  const slope = (pos2j - pos1j) / (pos2i - pos1i);
  const intercept = pos1j - slope * pos1i;
  const result: Position[] = [];
  let prevPos: Position | null = null;

  for (let x = 0; x < inputAsList.length; x++) {
    for (let y = 0; y < inputAsList[0].length; y++) {
      if (Math.abs(y - (slope * x + intercept)) < 0.0001) {
        if (prevPos !== null) {
          const distance: Position = [
            calcDistance(prevPos[0], x),
            calcDistance(prevPos[1], y),
          ];

          if (
            distance[0] === mainDistance[0] &&
            distance[1] === mainDistance[1]
          ) {
            result.push([x, y]);
          }
        } else {
          result.push([x, y]);
        }

        prevPos = [x, y];
      }
    }
  }

  return result;
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
