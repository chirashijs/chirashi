export function isIE(version) {
  let ua = navigator.userAgent.toLowerCase(),
      ie = (ua.indexOf('msie') != -1) ? parseInt(ua.split('msie')[1], 10) : false;

  return version ? ie == version : ie;
}
