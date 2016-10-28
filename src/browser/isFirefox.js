import _testUA from '../internals/_testUA'

/** Variable true if the browser is Firefox based on User Agent. */
const isFirefox = _testUA('firefox')

export default isFirefox
