import forEach from '../core/forEach';

export function toggleClass (elements, classes) {
  classes = classes.split(' ');

  forEach(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.toggle(classes[i]);
  });
}
