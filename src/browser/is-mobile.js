import isIOS       from './is-ios'
import isAndroid   from './is-android'
import isWindows   from './is-windows'
import isTouchable from './is-touchable'

/**
 * Variable true if the device is a mobile based on User Agent.
 */
var isMobile = isIOS || isAndroid || (isWindows && isTouchable)

export default isMobile
