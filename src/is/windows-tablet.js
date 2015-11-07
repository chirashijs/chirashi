import isWindows from './windows';
import isWindowsPhone from './windows-phone';

export function isWindowsTablet() {
  let ua = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor.toLowerCase();

  return isWindows() && !isWindowsPhone() && /touch/i.test(ua);
}

export default isWindowsTablet;
