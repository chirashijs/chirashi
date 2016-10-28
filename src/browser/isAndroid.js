import _testUA from '../internals/_testUA'

/** Variable true if the device is running Android based on User Agent. */
const isAndroid = _testUA('android')

export default isAndroid
