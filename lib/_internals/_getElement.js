const reg = /^[.#]?[\w-_]+$/

export default function _getElement (from, selector) {
  if (selector.search(reg) === 0) {
    switch (selector[0]) {
      case '.':
        return from.getElementsByClassName(selector.slice(1))[0]
      case '#':
        return from === document ? from.getElementById(selector.slice(1)) : from.querySelector(selector)
      default:
        return from.getElementsByTagName(selector)[0]
    }
  }

  return from.querySelector(selector)
}
