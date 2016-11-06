export default function _stringToArray (input, prefix) {
  const output = typeof input === 'string' ? input.split(/[,\s]+/g) : input

  return prefix ? output.map(string => `${prefix}${string}`) : output
}
