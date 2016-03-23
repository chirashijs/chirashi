export default function isTouchable() {
  return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
}
