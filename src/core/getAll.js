export function getAll (selector) {
  return [].slice.call(document.querySelectorAll(selector));
}
