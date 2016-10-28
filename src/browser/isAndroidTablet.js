import isAndroid from './isAndroid'
import _testUA from '../internals/_testUA'

/** Variable true if the device is an Android Tablet based on User Agent. */
const isAndroidTablet = isAndroid && !_testUA('mobile')

export default isAndroidTablet
