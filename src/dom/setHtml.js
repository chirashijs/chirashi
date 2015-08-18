import forEach from '../core/forEach';

export function setHtml (elements, string) {
  forEach(elements, (element) => {
    element.innerHTML = string;
  });
}
