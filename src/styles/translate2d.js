import { forElements } from '../core/for-elements';

const prefix = '-'+(Array.prototype.slice
  .call(window.getComputedStyle(document.documentElement, ''))
  .join('')
  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
)[1]+'-';

export function translate2d (elements, transformation, keep) {
  forElements(elements, (element) => {
    if (!element.style) return;

    let style = 'translate('+ transformation.x || 0 +'px,'+ transformation.y || 0 +'px)';

    if (keep) {
        element.style[prefix+'transform'] += style;
        element.style.transform += style;
    }
    else element.style[prefix+'transform'] = element.style.transform = style;
  });
}
