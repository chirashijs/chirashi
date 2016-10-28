import _testUA from '../internals/_testUA'

/** Variable true if the device is running iOS based on User Agent. */
const isIOS = _testUA('iphone|ipad|ipod')

export default isIOS
