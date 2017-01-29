const reg = /[,\s]+/g
export default function _stringToArray (input) {
  reg.lastIndex = 0

  if (typeof input === 'string' && input.search(reg)) {
    return input.split(reg)
  }

  return input
}
