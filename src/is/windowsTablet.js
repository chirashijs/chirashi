import { isWindows } from './windows';
import { isWindowsPhone } from './windowsPhone';
import { isTouchable } from './touchable';

export function isWindowsTablet() {
  let ua = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor && navigator.vendor.toLowerCase();

  return isWindows() && !isWindowsPhone() && isTouchable();
}
