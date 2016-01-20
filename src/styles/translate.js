import translate2d from './translate2d'
import translate3d from './translate3d'

const prefix = '-'+(Array.prototype.slice
  .call(window.getComputedStyle(document.documentElement, ''))
  .join('')
  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
)[1]+'-'
document.documentElement.style[prefix+'transform'] = 'translate3d(0, 0, 0)'
const use2d = !document.documentElement.style[prefix+'transform']
document.documentElement.style[prefix+'transform'] = ''

export function translate (elements, transformation, keep) {
    if (use2d)
      translate2d(elements, transformation, keep)
    else
      translate3d(elements, transformation, keep)
}

export default translate
