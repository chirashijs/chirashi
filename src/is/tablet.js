import isIPad from './ipad';
import isAndroidTablet from './android-tablet';
import isWindowsTablet from './windows-tablet';

export function isTablet() {
  return isIPad() || isAndroidTablet() || isWindowsTablet();
}

export default isTablet;
