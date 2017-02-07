import _nodelistToArray from './_nodelistToArray'

const reg = /^[.#]?[\w-_]+$/

export default function _getElements (from, selector) {
  if (selector.search(reg) === 0) {
    switch (selector[0]) {
      case '.':
        return _nodelistToArray(from.getElementsByClassName(selector.slice(1)))
      case '#':
        return [from.getElementById(selector.slice(1))]
      default:
        return _nodelistToArray(from.getElementsByTagName(selector))
    }
  }

  return _nodelistToArray(from.querySelectorAll(selector))
}
