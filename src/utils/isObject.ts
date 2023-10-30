export function isObject(value: unknown): value is Object {
  return value !== null && typeof value === "object";
}
