import isWindows from './isWindows'
import isWindowsPhone from './isWindowsPhone'
import isTouchable from './isTouchable'

/** Variable true if the device is a Windows Tablet based on User Agent. */
const isWindowsTablet = isWindows && !isWindowsPhone && isTouchable

export default isWindowsTablet
