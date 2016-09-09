import ua     from './ua'
import vendor from './vendor'

/**
 * Variable true if the browser is Safari based on User Agent.
 */
var isSafari = /safari/i.test(ua) && /apple computer/.test(vendor)

export default isSafari
