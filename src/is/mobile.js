import { isIOS } from './ios';
import { isAndroid } from './android';
import { isWindows } from './windows';

export function isMobile() {
  return isIOS() || isAndroid() || (isWindows() && /touch/i.test(navigator.userAgent.toLowerCase()));
}
