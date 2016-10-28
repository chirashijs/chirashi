export default function _stringToArray (input) {
  return typeof input === 'string' ? input.split(/[,\s]+/g) : input
}
