const reg = /[,\s]+/g
export default function _stringToArray (input) {
  reg.lastIndex = 0

  if (typeof input === 'string') {
    return input.search(reg) !== -1 ? input.split(reg) : [input]
  }

  return input
}
