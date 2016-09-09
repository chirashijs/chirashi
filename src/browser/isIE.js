import ua from './ua'

/**
 * Version number if the browser is Internet Explorer or false based on User Agent.
 */
var isIE = (ua.indexOf('msie') != -1) ? parseInt(ua.split('msie')[1], 10) : false

export default isIE
