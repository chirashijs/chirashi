import _parseAndApply from '../_internals/_parseAndApply'
import _kebabCase from '../_internals/_kebabCase'
import forIn from '../core/forIn'

/**
 * Set the provided css variables to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} variables - The key-value pairs of variables to set, the variable name shouldn't be prefixed with -- and can be in camelCase.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, setCssVariable } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setCssVariable('.maki', {
 *   opacity: 0.5,
 *   textColor: 'blue'
 * }) // returns: [<div class="maki" style="--opacity: 0.5; --text-color: 'rgb(0,0,255)'"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setCssVariable('.maki', {
 *   opacity: 0.5,
 *   textColor: 'blue'
 * }) // returns: [<div class="maki" style="--opacity: 0.5; --text-color: 'rgb(0,0,255)'"></div>]
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
