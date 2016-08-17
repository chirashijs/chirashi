import isIPad          from './is-ipad'
import isAndroidTablet from './is-android-tablet'
import isWindowsTablet from './is-windows-tablet'

/**
 * Variable true if the device is a tablet based on User Agent.
 */
var isTablet = isIPad || isAndroidTablet || isWindowsTablet

export default isTablet
