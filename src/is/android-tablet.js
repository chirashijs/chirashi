export function isAndroidTablet() {
  let ua = navigator.userAgent.toLowerCase();

  return /android/i.test(ua) && !/mobile/i.test(ua);
}

export default isAndroidTablet;
