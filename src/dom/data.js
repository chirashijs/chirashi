import setData from './set-data'
import getData from './get-data'

export function data (elements, option) {
  if (typeof option == 'object') {
    setData(elements, option)
  }
  else {
    return getData(elements, option)
  }
}

export default data
