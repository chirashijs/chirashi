import ua from './ua'

/**
 * Variable true if the device is an iPhone based on User Agent.
 */
var isIPhone = /iphone/i.test(ua)

export default isIPhone
