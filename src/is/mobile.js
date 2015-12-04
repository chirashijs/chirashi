import { isIOS } from './ios';
import { isAndroid } from './android';
import { isWindows } from './windows';
import { isTouchable } from './touchable';

export function isMobile() {
  return isIOS() || isAndroid() || (isWindows() && isTouchable());
}
