const reg = /^([.#])?([\w-_]+)$/g
export default function _find (from, selector) {
  reg.lastIndex = 0
  const match = reg.exec(selector)

  if (match) {
    const prefix = match[1]
    selector = match[2]

    if (prefix === '.') {
      return from.getElementsByClassName(selector)[0]
    }

    if (prefix === '#') {
      return from.getElementById(selector)
    }

    return from.getElementsByTagName(selector)[0]
  }

  return from.querySelector(selector)
}
