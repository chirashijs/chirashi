import ua from './ua'

/** Variable true if the device is an iPad based on User Agent. */
const isIPad = /ipad/i.test(ua)

export default isIPad
