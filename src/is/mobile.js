import { isIOS } from './ios';
import { isAndroid } from './android';
import { isWindows } from './windows';

export function isTablet() {
  return isIOS() || isAndroid() || (isWindows() && /touch/i.test(ua));
}
