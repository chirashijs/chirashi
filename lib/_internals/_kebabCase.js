const caps = /[A-Z]/g

export default function _kebabCase (input) {
  let output = '' + input

  let next
  while ((next = caps.exec(input))) {
    output = output.replace(new RegExp(next, 'g'), '-' + next[0].toLowerCase())
  }

  return output
}
