import forElements from '../core/for-elements';

export function removeAttr (elements, name) {
  forElements(elements, (element) => {
    if (!element.removeAttribute) return;

    element.removeAttribute(name);
  });
}

export default removeAttr;
