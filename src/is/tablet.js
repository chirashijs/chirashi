import { isIPad } from './ipad';
import { isAndroidTablet } from './androidTablet';
import { isWindowsTablet } from './windowsTablet';

export function isTablet() {
  return isIPad() || isAndroidTablet() || isWindowsTablet();
}
