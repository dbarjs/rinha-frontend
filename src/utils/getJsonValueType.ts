import { isNull } from './isNull';

/**
 * Returns JSON type of value.
 *
 * @example getJsonValueType({}) // "object"
 * @example getJsonValueType([]) // "array"
 * @example getJsonValueType(null) // "null"
 * @example getJsonValueType(undefined) // "undefined"
 * @example getJsonValueType("string") // "string"
 * @example getJsonValueType(123) // "number"
 * @example getJsonValueType(true) // "boolean"
 * @example getJsonValueType(() => {}) // "function"
 * @example getJsonValueType(Symbol("symbol")) // "symbol"
 * @example getJsonValueType(BigInt(123)) // "bigint"
 * @example getJsonValueType(new Date()) // "object"'
 */
export function getJsonValueType(value: unknown) {
  if (typeof value !== "object") {
    return typeof value;
  }
  
  if (Array.isArray(value)) {
    return "array";
  }

  if (isNull(value)) {
    return "null";
  }

  return "object";
}