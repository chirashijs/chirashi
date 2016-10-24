import ua from './ua'

/** Variable true if the device is running Android based on User Agent. */
const isAndroid = /android/i.test(ua)

export default isAndroid
