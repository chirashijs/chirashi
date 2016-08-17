import ua from './ua'

/**
 * Variable true if the device is an iPod based on User Agent.
 */
var isIPod = /ipod/i.test(ua)

export default isIPod
