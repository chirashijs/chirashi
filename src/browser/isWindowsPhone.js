import ua from './ua'
import isWindows from './isWindows'

/** Variable true if the device is a Windows Phone based on User Agent. */
const isWindowsPhone = isWindows && /phone/i.test(ua)

export default isWindowsPhone
