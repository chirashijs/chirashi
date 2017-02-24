import _parseAndApply from '../_internals/_parseAndApply'
import _kebabCase from '../_internals/_kebabCase'

const unitless = [
  'z-index',
  'zoom',
  'font-weight',
  'line-height',
  'counter-reset',
  'counter-increment',
  'volume',
  'stress',
  'pitch-range',
  'richness',
  'opacity'
]

/**
 * Set the provided style to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} style - The style options as object with keys the css property and values, string values or number. If the value is a number and property doesn't support unitless values, pixels will be used.
 * @return {Array} domElements - The array of dom elements from elements for chaining.
 * @example //esnext
 * import { append, setStyle, position } from 'chirashi'
 *
 * append(document.body, '.maki')
 * append('.maki', '.salmon')
 *
 * setStyle('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * }) // returns: [<div class="maki" style="display: block; position: absolute; top: 200px; left: 240px; width: 100px; height: 100px; border-radius: 50%; background: black;"><div class="salmon"></div></div>]
 *
 * const salmon = setStyle('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * }) // returns: [<div class="salmon" style="display: block; position: absolute; top: 20px; left: 10px; width: 10px; height: 10px; border-radius: 50%; background: pink;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * Chirashi.append('.maki', '.salmon')
 *
 * Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * }) // returns: [<div class="maki" style="display: block; position: absolute; top: 200px; left: 240px; width: 100px; height: 100px; border-radius: 50%; background: black;"><div class="salmon"></div></div>]
 *
 * const salmon = Chirashi.setStyle('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * }) // returns: [<div class="salmon" style="display: block; position: absolute; top: 20px; left: 10px; width: 10px; height: 10px; border-radius: 50%; background: pink;"></div>]
 */
const setStyle = _parseAndApply.bind(null, _applyUnit, _applyStyle)
export default setStyle

function _applyUnit (style, prop, value) {
  if (unitless.indexOf(_kebabCase(prop)) === -1 && typeof value === 'number') {
    style[prop] += 'px'
  }
}

function _applyStyle (style, element) {
  if (!element.style) return

  Object.assign(element.style, style)
}
