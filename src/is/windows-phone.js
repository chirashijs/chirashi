import isWindows from './windows';

export function isWindowsPhone() {
  let ua = navigator.userAgent.toLowerCase();

  return isWindows() && /phone/i.test(ua);
}

export default isWindowsPhone;
