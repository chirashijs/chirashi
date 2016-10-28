import _testUA from '../internals/_testUA'
import isWindows from './isWindows'

/** Variable true if the device is a Windows Phone based on User Agent. */
const isWindowsPhone = isWindows && _testUA('phone')

export default isWindowsPhone
