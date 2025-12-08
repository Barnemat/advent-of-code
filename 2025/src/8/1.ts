import { INPUT_8 } from "@/src/8/input";
import { euclideanDistance } from "@/src/utils/euclidean-distance";
import { product } from "@/src/utils/product";

type DistanceMap = Map<string, Map<string, number>>;

const getNShortestDistances = (
  map: DistanceMap,
  n: number,
): [string, string, number][] => {
  const allDistances: [string, string, number][] = [];

  for (const [from, destinations] of map) {
    for (const [to, distance] of destinations) {
      if (from < to) allDistances.push([from, to, distance]);
    }
  }

  return allDistances.sort((a, b) => a[2] - b[2]).slice(0, n);
};

const run = (input: string, numConnections: number = 1000) => {
  const distanceMap: DistanceMap = new Map();

  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < lines.length; j++) {
      const distanceTo = lines[j];

      if (
        i === j ||
        (distanceMap.has(line) && distanceMap.get(line)!.has(distanceTo))
      ) {
        continue;
      }

      const prevValue = distanceMap.get(line);
      distanceMap.set(
        line,
        (prevValue ?? new Map()).set(
          distanceTo,
          euclideanDistance(
            line.split(",").map(Number),
            distanceTo.split(",").map(Number),
          ),
        ),
      );
    }
  }

  const nShortestDistances = getNShortestDistances(distanceMap, numConnections);

  const circuits = new Map<string, Set<string>>();

  for (const key of distanceMap.keys()) {
    circuits.set(key, new Set([key]));
  }

  for (const [node1, node2] of nShortestDistances) {
    const circuit1 = circuits.get(node1)!;
    const circuit2 = circuits.get(node2)!;

    if (circuit1 !== circuit2) {
      for (const node of circuit1) {
        circuit2.add(node);
        circuits.set(node, circuit2);
      }
    }
  }

  const circuitSizes = [...new Set(circuits.values())]
    .map((circuit) => circuit.size)
    .sort((a, b) => b - a)
    .slice(0, 3);

  console.log(product(...circuitSizes));
};

run(INPUT_8);
