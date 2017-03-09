import getElement from '../core/getElement'
import _getOneOrMore from './_getOneOrMore'

export default function _getOneOrMoreFromElement (execute, element, ...args) {
  return !!(element = getElement(element)) && _getOneOrMore(args, execute.bind(null, element))
}
