/**
 * Execute callback once for all fired during a waiting time.
 * @param {function} callback - The callback function
 * @param {number} wait - The waiting time in milliseconds
 * @param {bool} [immediate=false] - Execute callback on first trigger
 * @return {function} debounced - The debounced callback with cancel method
 */
export default function debounce (callback, wait, immediate = false) {
  let canCall = immediate
  let timeout

  const applyCallback = args => {
    canCall = false
    callback(...args)

    timeout = setTimeout(() => canCall = immediate, wait)
  }

  const debounced = (...args) => {
    clearTimeout(timeout)

    if (canCall) {
      applyCallback(args)
    } else {
      timeout = setTimeout(applyCallback.bind(null, args), wait)
    }

    debounced.cancel = () => {
      clearTimeout(timeout)
      canCall = true
      timeout = null
    }
  }

  return debounced
}
