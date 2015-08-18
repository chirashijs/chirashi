import { getAttr } from './getAttr';

export function getData (element, name) {
  return getAttr(element, 'data-'+name);
}
