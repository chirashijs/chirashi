/** Variable true if the device handle touches events. */
const isTouchable = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)

export default isTouchable
