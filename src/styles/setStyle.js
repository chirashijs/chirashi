import forElements from '../core/forElements'
import forIn from '../core/forIn'

const unitless = [
  'zIndex',
  'z-index',
  'zoom',
  'font-weight',
  'lineHeight',
  'line-height',
  'counterReset',
  'counter-reset',
  'counterIncrement',
  'counter-increment',
  'volume',
  'stress',
  'pitchRange',
  'pitch-range',
  'richness',
  'opacity'
]

/**
* Set the provided style to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} style - The style options as object linking value to property
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setStyle (elements, style) {
  forIn(style, (prop, value) => {
    if (unitless.indexOf(prop) === -1 && typeof value === 'number') {
      style[prop] += 'px'
    }
  })

  return forElements(elements, element => {
    if (!element.style) return

    Object.assign(element.style, style)
  })
}
