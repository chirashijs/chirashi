const regex = /(([#\.]?)([\w-_]+))|(\[([\w-_]+)(="([\w-_\.{}:']+)")?\])/g

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
export default function createElement (string) {
  if (string.indexOf('<') === -1) {
    let core = null

    let attributes = ''
    let className = ''

    let segment
    while ((segment = regex.exec(string))) {
      if (typeof segment[5] !== 'undefined') { // attribute
        attributes += ` ${segment[5]}${typeof segment[7] !== 'undefined' ? `="${segment[7]}"` : ''}`
      } else {
        if (segment[2] === '.') { // className
          className += ` ${segment[3]}`
        } else if (segment[2] === '#') { // id
          attributes += ` id="${segment[3]}"`
        } else { // tag
          core = segment[3]
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
