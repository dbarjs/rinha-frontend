import { isObject } from "./isObject";

export function getKeysCount(obj: unknown, keysCount: number = 0): number {
  if (!isObject(obj)) {
    return keysCount + 1;
  }

  return (
    Object.values(obj).reduce<number>(
      (childCount, childProperty) => getKeysCount(childProperty, childCount),
      keysCount
    ) + 1
  );
}
