export function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
}

export default isIOS
