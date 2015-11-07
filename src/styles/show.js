import forElements from '../core/for-elements';

export function show (elements) {
  forElements(elements, (element) => {
    if (!element.style) return;

    element.style.visibility = '';
  });
}

export default show;
