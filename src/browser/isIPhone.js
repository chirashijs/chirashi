import ua from './ua'

/** Variable true if the device is an iPhone based on User Agent. */
const isIPhone = /iphone/i.test(ua)

export default isIPhone
