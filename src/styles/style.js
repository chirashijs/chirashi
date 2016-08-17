import setStyle from './set-style'
import getStyle from './get-style'

export default function style (elements, option) {
  if (typeof option == 'object') {
    return setStyle(elements, option)
  }
  else if (typeof option == 'string') {
    return getStyle(elements, option)
  }
}
