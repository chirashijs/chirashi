 import setStyleProp from './setStyleProp'

/**
 * Set the provided width to elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @param {(number|string)} width - The width as number or string. For number, unit used will be pixels.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, setWidth } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setWidth('.maki', 20) // returns: [<div class="maki" style="width: 20px;"></div>]
 * setWidth('.maki', '100%') // returns: [<div class="maki" style="width: 100%;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setWidth('.maki', 20) // returns: [<div class="maki" style="width: 20px;"></div>]
 * Chirashi.setWidth('.maki', '100%') // returns: [<div class="maki" style="width: 100%;"></div>]
 */
export default function setWidth (elements, width) {
  return setStyleProp(elements, { width })
}
