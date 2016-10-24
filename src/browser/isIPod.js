import ua from './ua'

/** Variable true if the device is an iPod based on User Agent. */
const isIPod = /ipod/i.test(ua)

export default isIPod
