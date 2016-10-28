import forElements from '../core/forElements'

export default function _updateClassList (elements, method, classes) {
  if (typeof classes === 'string') classes = classes.split(/[,\s]+/g)

  return forElements(elements, element => {
    if (!element.classList) return

    element.classList[method](...classes)
  })
}
