import forIn from '../core/forIn'
import forElements from '../core/forElements'

export default function _parseAndApply (parse, apply, elements, options) {
  forIn(options, parse.bind(null, options))

  return forElements(elements, apply.bind(null, options))
}
