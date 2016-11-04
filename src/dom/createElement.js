import forEach from '../core/forEach'
import setAttr from './setAttr'
import addClass from './addClass'

/**
 * Creates a dom element from an HTML string, tag or css selector.
 * @param {string} string - The html string, tag or css selector.
 * @return {HTMLElement | SVGElement} element - The dom element created from the string.
 * @example //esnext
 * import { createElement } from 'chirashi'
 * const maki = createElement('.maki')
 * const cheese = createElement('.cheese')
 * append(maki, cheese)
 * append(document.body, maki)
 * let level = {}
 * closest(cheese, maki, level) //returns: <div class="maki"></div>
 * console.log(level.value) //logs: 1
 * closest('.cheese', '.sushi') //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * var cheese = Chirashi.createElement('.cheese')
 * Chirashi.append(maki, cheese)
 * Chirashi.append(document.body, maki)
 * var level = {}
 * Chirashi.closest(cheese, '.maki', level) //returns: <div class="maki"></div>
 * console.log(level.value) //logs: 1
 * Chirashi.closest('.cheese', '.sushi') //returns: false
 */
export default function createElement (string) {
  const attributes = {}
  const classes = []

  if (string.indexOf('<') === -1) {
    let core = null

    forEach(string.match(/[#\.\[]?[a-zA-Z0-9-_+]+(=["'a-zA-Z0-9-_+\.]+\]?)?/g), segment => {
      if (segment.indexOf('.') === 0) {
        classes.push(segment.slice(1))
      } else if (segment.indexOf('#') === 0) {
        attributes.id = segment.slice(1)
      } else if (segment.indexOf('[') === 0) {
        segment = segment.replace(/[\[\]]/g, '').split('=')
        attributes[segment[0]] = segment.length > 1 ? segment[1].slice(1, -1) : ''
      } else {
        core = segment
      }
    })

    if (core === null) core = 'div'

    string = `<${core}></${core}>`
  }

  let temp = document.createElement('div')
  temp.innerHTML = string

  let element = temp.firstChild
  setAttr(element, attributes)
  addClass(element, classes)

  return element
}
