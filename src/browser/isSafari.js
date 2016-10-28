import _testUA from '../internals/_testUA'

/** Variable true if the browser is Safari based on User Agent. */
const isSafari = _testUA('safari', 'apple computer')

export default isSafari
