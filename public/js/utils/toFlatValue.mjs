import { isNull } from "./isNull.mjs";
import { isObject } from "./isObject.mjs";

function getIndexedId(index, parentId) {
  return parentId ? `${parentId}.${index}` : `${index}`;
}

function getObjectType(obj) {
  if (Array.isArray(obj)) {
    return "array";
  }

  if (isNull(obj)) {
    return "null";
  }

  return typeof obj;
}

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
 *
 * @param {any} value
 */
function getJsonValueType(value) {
  if (typeof value !== "object") {
    return typeof value;
  }

  return getObjectType(value);
}

function getObjectKeys(obj, parentId) {
  return Object.keys(obj).reduce((keys, key, index) => {
    keys.push([key, getIndexedId(index, parentId)]);

    return keys;
  }, []);
}

/**
 * Converts any value object to flat object (array) with indexedId and valueType.
 * If value is object, then it will be converted to flat recursively.
 *
 * Each entry in flat object is tuple with 4 elements:
 * 1. key (original key from value object)
 * 2. value (original value from value object)
 * 3. indexedId (example: "0.1.3.5")
 * 4. valueType (JSON type)
 *
 * @param {object} value object or array
 * @param {string} parentId indexedId of parent object
 */
export function toFlatValue(value, parentId = "", parentResult = [[], []]) {
  return Object.entries(value).reduce((result, entry, index) => {
    const id = getIndexedId(index, parentId);

    result[0].push(id);

    if (isObject(entry[1])) {
      result[1].push([id, entry[1]]);
    }

    return result;
  }, parentResult);
}
