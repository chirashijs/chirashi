import removeAttr from './removeAttr';

export function removeData (elements, name) {
  return removeAttr(elements, 'data-'+name);
}
