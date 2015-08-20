import { getSelector } from '../core';
import { getWidth } from './getWidth';
import { getHeight } from './getHeight';

export function getSize (element) {
  if (typeof element == 'string') element = getSelector(element);

  return element && {
    width: getWidth(element),
    height: getHeight(element)
  };
}
