const regex = /[#.]?([\w-_]+)|\[([\w-_]+)(="([\w.,;:{}'/\\#!@_&?%=<>-\s]+)?")?]|{([\w.,;:{}/\\'"#!@_&?%=<>-\s]+)}/g

/**
 * Creates a dom element from an HTML string, tag or css like selector with text between {} if needed.
 * @param {string} string - The html string, tag or css like selector.
 * @return {Element} element - The dom element created from the string.
 * @example //esnext
 * import { createElement } from 'chirashi'
 * const maki = createElement('a#sushi.link[data-href="chirashijs.org"][data-link]{click me!}') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link>click me!</a>
 * const greetings = createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 * @example //es5
 * var maki = Chirashi.createElement('a#sushi.link[data-href="chirashijs.org"][data-link]{click me!}') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link>click me!</a>
 * var greetings = Chirashi.createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 */
export default function createElement (string) {
  regex.lastIndex = 0

  if (string.indexOf('<') !== 0) {
    let core = null

    let attributes = ''
    let className = ''
    let text = ''

    let segment
    while ((segment = regex.exec(string))) {
      if (segment[1]) {
        switch (segment[0][0]) {
          case '#':
            attributes += ` id="${segment[1]}"`
            break

          case '.':
            className += ` ${segment[1]}`
            break

          default:
            core = segment[1]
        }
      } else if (segment[2]) {
        attributes += ` ${segment[2]}${segment[4] ? `="${segment[4]}"` : ''}`
      } else {
        text = segment[5]
      }
    }

    if (core === null) core = 'div'

    string = `<${core}${className ? ` class="${className.slice(1)}"` : ''}${attributes}>${text}</${core}>`
  }

  let temp = document.createElement('div')
  temp.innerHTML = string

  let element = temp.firstChild

  return element
}
