export function isDomElement(element) {
  return element instanceof HTMLElement || element === window || element === document || element instanceof SVGElement;
}

export default isDomElement;
