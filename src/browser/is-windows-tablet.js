import isWindows      from './is-windows'
import isWindowsPhone from './is-windows-phone'
import isTouchable    from './is-touchable'

/**
 * Variable true if the device is a Windows Tablet based on User Agent.
 */
var isWindowsTablet = isWindows && !isWindowsPhone && isTouchable

export default isWindowsTablet
