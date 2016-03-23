export default function isTouchable() {
  return /touch/i.test(navigator.userAgent.toLowerCase())
}
