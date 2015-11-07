import forElements from '../core/for-elements';

export function addClass (elements, classes) {
  classes = classes.split(' ');

  forElements(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.add(classes[i]);
  });
}

export default addClass;
