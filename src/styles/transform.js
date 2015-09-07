import { transform2d } from './transform2d'
import { transform3d } from './transform3d'

export function transform (elements, transformation) {
    const prefix = '-'+(Array.prototype.slice
      .call(window.getComputedStyle(document.documentElement, ''))
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1]+'-';

    document.documentElement.style[prefix+'transform'] = document.documentElement.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';

    if (!document.documentElement.style[prefix+'transform'] && !document.documentElement.style.transform)
      transform2d(elements, transformation)

    else
      transform3d(elements, transformation);

    document.documentElement.style[prefix+'transform'] = document.documentElement.style.transform = '';
}
