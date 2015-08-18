export function deepClone (object) {
  if (object == null || typeof object !== 'object') return object;

  let copy = object.constructor();
  for (var attr in object) {
    if (object.hasOwnProperty(attr)) copy[attr] = object[attr];
  }

  return copy;
}
