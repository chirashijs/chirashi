import scale2d from './scale2d';
import scale3d from './scale3d';

const prefix = '-'+(Array.prototype.slice
  .call(window.getComputedStyle(document.documentElement, ''))
  .join('')
  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
)[1]+'-';
document.documentElement.style[prefix+'transform'] = 'scale3d(1, 1, 1)';
const use2d = !document.documentElement.style[prefix+'transform'];
document.documentElement.style[prefix+'transform'] = '';

export function scale (elements, transformation, keep) {
    if (use2d)
      scale2d(elements, transformation, keep);
    else
      scale3d(elements, transformation, keep);
}

export default scale;
