export function get (selector) {
  return document.querySelector(selector);
}

export function getAll (selector) {
  return [].slice.call(document.querySelectorAll(selector));
}

export function forEach (elements, callback) {
  if (typeof elements == 'string') elements = getAll(elements);

  if (!elements) return;

  if (elements instanceof HTMLElement || elements === window || elements === document) {
    callback(elements);
  }
  else {
    let i = elements.length;
    while(i--) callback(elements[i]);
  }
}
