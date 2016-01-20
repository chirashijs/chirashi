export function isIPad() {
  return /ipad/i.test(navigator.userAgent.toLowerCase())
}

export default isIPad
