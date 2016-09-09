import ua     from './ua'
import vendor from './vendor'

/**
 * Variable true if the browser is Chrome or Chromium based on User Agent.
 */
var isChrome = /chrome|chromium/i.test(ua) && /google inc/.test(vendor)

export default isChrome
