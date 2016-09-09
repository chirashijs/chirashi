import ua from './ua'

/**
 * Variable true if the browser is Firefox based on User Agent.
 */
var isFirefox = /firefox/i.test(ua)

export default isFirefox
