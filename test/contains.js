export default function contains (arr, nl) {
  const clone = arr.slice()
  let i = nl.length
  while (i--) {
    const removed = clone.splice(clone.indexOf(nl[i]), 1)
    if (!removed) return false
  }

  return !clone.length
}
