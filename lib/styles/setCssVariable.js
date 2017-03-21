import _parseAndApply from '../_internals/_parseAndApply'
import _kebabCase from '../_internals/_kebabCase'
import forIn from '../core/forIn'

/**
 * Set the provided style to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} style - The style options as object with keys the css property and values, string values or number. If the value is a number and property doesn't support unitless values, pixels will be used.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, setStyleProp, position } from 'chirashi'
 *
 * append(document.body, '.maki')
 * append('.maki', '.salmon')
 *
 * setStyleProp('.maki', {
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
 * const salmon = setStyleProp('.salmon', {
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
 * Chirashi.setStyleProp('.maki', {
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
 * const salmon = Chirashi.setStyleProp('.salmon', {
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
const setCssVariable = _parseAndApply.bind(null, _applyPrefix, _applyVariables)
export default setCssVariable

function _applyPrefix (variables, prop, value) {
  variables['--' + _kebabCase(prop)] = value
}

function _applyVariables (variables, element) {
  if (!element.style) return

  forIn(variables, _applyVariable.bind(null, element))
}

function _applyVariable (element, key, value) {
  element.style.setProperty(key, value)
}
