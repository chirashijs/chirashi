import { isWindows } from 'windows';
import { isWindowsPhone } from 'windowsPhone';

export function isWindowsTablet() {
  let ua = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor.toLowerCase();

  return isWindows() && !isWindowsPhone() && /touch/i.test(ua);
}
