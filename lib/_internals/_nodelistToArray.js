import _chirasizeArray from './_chirasizeArray'

export default function _nodelistToArray (collection) {
  const arr = []

  let i = -1
  while ((arr[++i] = collection[i])) {}

  arr.length--

  return _chirasizeArray(arr)
}
