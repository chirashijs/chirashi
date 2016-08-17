import ua        from './ua'
import isAndroid from './is-android'

/**
 * Variable true if the device is an Android Tablet based on User Agent.
 */
var isAndroidTablet = isAndroid && !/mobile/i.test(ua)

export default isAndroidTablet
