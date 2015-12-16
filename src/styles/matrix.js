import matrix2d from './matrix2d';
import matrix3d from './matrix3d';

const prefix = '-'+(Array.prototype.slice
  .call(window.getComputedStyle(document.documentElement, ''))
  .join('')
  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
)[1]+'-';
document.documentElement.style[prefix+'matrix'] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
const use2d = !document.documentElement.style[prefix+'matrix'];
document.documentElement.style[prefix+'matrix'] = '';

export function matrix (elements, transformation) {
    if (use2d)
      matrix2d(elements, transformation);
    else
      matrix3d(elements, transformation);
}

export default matrix;
