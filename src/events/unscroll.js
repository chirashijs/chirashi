import { off } from './off';

export function unresize (callback) {
  off(window, 'scroll mousewheel DOMMouseScroll', callback);
}
