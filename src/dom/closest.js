import getElement from '../core/get-element'

export function closest (element, tested, level) {
  if (level && typeof level.value != 'undefined') ++level.value

  element = getElement(element)

  return ((!element || element === window || element === document) ?
            false
            : ((typeof tested == 'string' && element.matches(tested) || element == tested) ?
                element
                : closest(element.parentNode, tested, level)))
}

export default closest
