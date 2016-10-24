import ua from './ua'

/** Version number if the browser is Internet Explorer or false based on User Agent. */
const isIE = (ua.indexOf('msie') !== -1) ? +ua.split('msie')[1] : false

export default isIE
