import getProp from '../dom/getProp'

export default function _getLength (element, direction, offset) {
  return getProp(element, (offset ? 'offset' : 'client') + direction)
}
