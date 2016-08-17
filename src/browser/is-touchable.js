/**
 * Variable true if the device handle touches events.
 */

var isTouchable = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)

export default isTouchable
