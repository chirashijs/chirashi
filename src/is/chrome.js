export function isChrome() {
  let ua = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor.toLowerCase();

  return /chrome|chromium/i.test(ua) && /google inc/.test(vendor);
}

export default isChrome;
