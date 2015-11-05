import { isIPad } from './ipad';
import { isAndroidTablet } from './androidTablet';
import { isWindowsTablet } from './androidTablet';

export function isTablet() {
  return isIPad() || isAndroidTablet() || isWindowsTablet();
}
