import ua from './ua'

/**
 * Version number if the browser is Internet Explorer or false based on User Agent.
 */
let ie = (ua.indexOf('msie') != -1) ? parseInt(ua.split('msie')[1], 10) : false

var isIE = version ? ie == version : ie

export default isIE
