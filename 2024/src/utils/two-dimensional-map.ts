export interface TwoDimensionalMap<T> {
  [i: number]: {
    [j: number]: T;
  };
}

export const generateTwoDimensionalMap = <T, V>(
  input: T[][],
  transform: (value: T) => V,
  pruneUndefinedValues?: boolean,
  pruneEmptyObjects?: boolean,
): TwoDimensionalMap<V> =>
  input.reduce((acc: TwoDimensionalMap<V>, value: T[], i: number) => {
    const innerRes = value.reduce(
      (innerAcc: Record<number, V>, innerVal: T, j: number) => {
        const transformed = transform(innerVal);

        if (
          (pruneUndefinedValues && transformed !== undefined) ||
          !pruneUndefinedValues
        ) {
          innerAcc[j] = transformed;
        }

        return innerAcc;
      },
      {},
    );

    if (pruneEmptyObjects && Object.keys(innerRes).length === 0) {
      return acc;
    }

    acc[i] = innerRes;

    return acc;
  }, {});
