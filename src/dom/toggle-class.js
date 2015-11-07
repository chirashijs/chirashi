import forElements from '../core/for-elements';

export function toggleClass (elements, classes) {
  classes = classes.split(' ');

  forElements(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.toggle(classes[i]);
  });
}

export default toggleClass;
