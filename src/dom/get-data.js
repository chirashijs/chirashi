import { getAttr } from './get-attr'

export function getData (element, name) {
  return getAttr(element, 'data-'+name)
}

export default getData
