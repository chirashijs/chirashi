import isIOS       from './isIOS'
import isAndroid   from './isAndroid'
import isWindows   from './isWindows'
import isTouchable from './isTouchable'

/**
 * Variable true if the device is a mobile based on User Agent.
 */
var isMobile = isIOS || isAndroid || (isWindows && isTouchable)

export default isMobile
