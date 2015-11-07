import forElements from '../core/for-elements';

export function setHtml (elements, string) {
  forElements(elements, (element) => {
    element.innerHTML = string;
  });
}

export default setHtml;
