/**
 * Cache callbacks result for arguments and return cached results when called with the same ones
 * @param {function} callback - The function to call
 * @return {function} memoized - The memoized callback
 */
export default function memoize (callback) {
  const cache = {}

  return function () {
    const args = JSON.stringify(arguments)

    if (!(args in cache)) {
      cache[args] = callback.call(this, ...arguments)
    }

    return cache[args]
  }
}
