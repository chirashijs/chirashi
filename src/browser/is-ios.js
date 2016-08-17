import ua from './ua'

/**
 * Variable true if the device is running iOS based on User Agent.
 */
var isIOS = /iphone|ipad|ipod/i.test(ua)

export default isIOS
