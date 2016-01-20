export function isWindows() {
  let appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || ''

  return /win/i.test(appVersion)
}

export default isWindows
