/**
 * Variable true if the device is running Windows based on User Agent.
 */

var isWindows = /win/i.test('navigator' in window && 'appVersion' in window.navigator && window.navigator.appVersion.toLowerCase() || '')

export default isWindows
