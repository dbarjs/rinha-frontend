// function getIndexedId(index: number, parentId: string) {
//   return parentId ? `${parentId}.${index}` : `${index}`;
// }

// function getObjectKeys(obj, parentId) {
//   return Object.keys(obj).reduce((keys, key, index) => {
//     keys.push([key, getIndexedId(index, parentId)]);

//     return keys;
//   }, []);
// }

/**
 * Converts any value object to flat object (array) with indexedId and valueType.
 * If value is object, then it will be converted to flat recursively.
 *
 * Each entry in flat object is tuple with 4 elements:
 * 1. key (original key from value object)
 * 2. value (original value from value object)
 * 3. indexedId (example: "0.1.3.5")
 * 4. valueType (JSON type)
 */
export function toFlatValue(
  _value: object,
  _parentId: string = "",
  _parentResult = [[], []]
) {
  // return Object.entries(value).reduce((result, entry, index) => {
  //   const id = getIndexedId(index, parentId);
  //   result[0].push(id);
  //   if (isObject(entry[1])) {
  //     result[1].push([id, entry[1]]);
  //   }
  //   return result;
  // }, parentResult);
}
