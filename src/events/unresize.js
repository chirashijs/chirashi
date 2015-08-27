import { off } from './off';

export function unresize (callback) {
  off(window, 'resize', callback);
}
