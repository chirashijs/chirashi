import on from './on'

/**
 * Execute callback when dom is ready.
 * @param {eventCallback} callback - The callback.
 */
export default function ready (callback) {
  on(document, {
    'DOMContentLoaded': callback
  })
}
