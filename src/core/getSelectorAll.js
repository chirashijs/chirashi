export function getSelectorAll (selector) {
  return [].slice.call(document.querySelectorAll(selector));
}
