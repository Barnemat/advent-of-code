import { INPUT_9 } from "@/src/9/input";

type Coordinate = [number, number];
type VerticalEdge = { x: number; yMin: number; yMax: number };
type HorizontalEdge = { y: number; xMin: number; xMax: number };

const coordinateIsInside = (
  [x, y]: Coordinate,
  verticalEdges: VerticalEdge[],
): boolean => {
  let passed = 0;
  for (const e of verticalEdges) {
    if (y > e.yMin && y <= e.yMax && x < e.x) passed++;
  }
  return passed % 2 === 1;
};

const edgeCutsRectangle = (
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  verticalEdges: VerticalEdge[],
  horizontalEdges: HorizontalEdge[],
): boolean => {
  for (const edge of verticalEdges) {
    if (
      edge.x > xMin &&
      edge.x < xMax &&
      edge.yMax > yMin &&
      edge.yMin < yMax
    ) {
      return true;
    }
  }

  for (const edge of horizontalEdges) {
    if (
      edge.y > yMin &&
      edge.y < yMax &&
      edge.xMax > xMin &&
      edge.xMin < xMax
    ) {
      return true;
    }
  }
  return false;
};

const run = (input: string) => {
  const lines = input.split("\n");
  const coordinates = lines.map(
    (line) => line.split(",").map(Number) as Coordinate,
  );

  const verticalEdges: VerticalEdge[] = [];
  const horizontalEdges: HorizontalEdge[] = [];

  for (let i = 0; i < coordinates.length; i++) {
    const [x1, y1] = coordinates[i];
    const [x2, y2] = coordinates[(i + 1) % coordinates.length];

    if (x1 === x2) {
      verticalEdges.push({
        x: x1,
        yMin: Math.min(y1, y2),
        yMax: Math.max(y1, y2),
      });
    } else {
      horizontalEdges.push({
        y: y1,
        xMin: Math.min(x1, x2),
        xMax: Math.max(x1, x2),
      });
    }
  }

  let max = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const [a1, a2] = coordinates[i];

    for (let j = i + 1; j < coordinates.length; j++) {
      const [b1, b2] = coordinates[j];

      const xMin = Math.min(a1, b1);
      const xMax = Math.max(a1, b1);
      const yMin = Math.min(a2, b2);
      const yMax = Math.max(a2, b2);

      const coordinateX = (xMin + xMax) / 2;
      const coordinateY = (yMin + yMax) / 2;

      if (
        coordinateIsInside([coordinateX, coordinateY], verticalEdges) &&
        !edgeCutsRectangle(
          xMin,
          xMax,
          yMin,
          yMax,
          verticalEdges,
          horizontalEdges,
        )
      ) {
        const distX = xMax - xMin + 1;
        const distY = yMax - yMin + 1;
        const area = distX * distY;
        if (area > max) max = area;
      }
    }
  }

  console.log(max);
};

console.time("time");
// 1566346198
run(INPUT_9);
console.timeEnd("time");
