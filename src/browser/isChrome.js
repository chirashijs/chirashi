import _testUA from '../internals/_testUA'

/** Variable true if the browser is Chrome or Chromium based on User Agent. */
const isChrome = _testUA('chrome|chromium', 'google inc')

export default isChrome
