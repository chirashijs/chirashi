/**
 * Creates a dom element from an HTML string, tag or css selector.
 * @param {string} string - The html string, tag or css selector.
 * @return {(HTMLElement|SVGElement)} element - The dom element created from the string.
 * @example //esnext
 * import { createElement } from 'chirashi'
 * const maki = createElement('a#sushi.link[data-href="chirashijs.org"][data-link]') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link></a>
 * const greetings = createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 * @example //es5
 * var maki = Chirashi.createElement('a#sushi.link[data-href="chirashijs.org"][data-link]') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link></a>
 * var greetings = Chirashi.createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 */
const regex = /([#.]?)([\w-_]+)|\[([\w-_]+)(=([\w.{}:'"\s]+))?]/g
export default function createElement (string) {
  regex.lastIndex = 0

  if (string.indexOf('<') === -1) {
    let core = null

    let attributes = ''
    let className = ''

    let segment
    while ((segment = regex.exec(string))) {
      const attribute = segment[3]
      if (typeof attribute !== 'undefined') { // attribute
        const value = segment[5]
        attributes += ` ${attribute}${typeof value !== 'undefined' ? `=${value}` : ''}`
      } else {
        const prefix = segment[1]
        const value = segment[2]
        if (prefix === '.') { // className
          className += ` ${value}`
        } else if (prefix === '#') { // id
          attributes += ` id="${value}"`
        } else { // tag
          core = value
        }
      }
    }

    if (core === null) core = 'div'

    string = `<${core}${className ? ` class="${className.slice(1)}"` : ''}${attributes}></${core}>`
  }

  let temp = document.createElement('div')
  temp.innerHTML = string

  let element = temp.firstChild

  return element
}
