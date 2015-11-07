export function isIPhone() {
  return /iphone/i.test(navigator.userAgent.toLowerCase());
}

export default isIPhone;
