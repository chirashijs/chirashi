import once from './once'

/**
 * Execute callback when dom is ready.
 * @param {eventCallback} callback - The callback.
 * @example //esnext
 * import { ready } from 'chirashi'
 * ready(() => {
 *   console.log('Hello World!')
 * })
 * // Dom already complete or event fired.
 * // LOGS: "Hello World!"
 * @example //es5
 * Chirashi.ready(function () {
 *   console.log('Hello World!')
 * })
 * // Dom already complete or event fired.
 * // LOGS: "Hello World!"
 */
export default function ready (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    once(document, {
      'DOMContentLoaded': callback
    })
  }
}
