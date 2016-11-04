import once from './once'

/**
 * Execute callback when dom is ready.
 * @param {eventCallback} callback - The callback.
 */
export default function ready (callback) {
  return once(document, {
    'DOMContentLoaded': callback
  })
}
