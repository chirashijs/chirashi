/**
 * Cache callbacks result for arguments and return cached results when called with the same ones
 * @param {function} callback - The function to call
 * @return {function} memoized - The memoized callback
 */
export default function memoize (callback) {
  const cache = {}

  return () => {
    const args = JSON.stringify(arguments)

    return args in cache ? cache[args] : cache[args] = callback.call(this, ...arguments)
  }
}
