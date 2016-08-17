/**
 * Execute callback once for all fired during a waiting time.
 * @param {function} callback - The callback function
 * @param {number} wait - The waiting time in milliseconds
 * @param {bool} [immediate=false] - Execute callback on first trigger
 * @return {function} debounced - The debounced callback with cancel method
 */
export default function debounce (callback, wait, immediate = false) {
    let canCall = immediate, timeout

    const applyCallback = function() {
        canCall = false
        callback.call(this, ...arguments)

        timeout = setTimeout(function () {canCall = immediate}, wait)
    }

    const debounced = function() {
        clearTimeout(timeout)

        if (canCall)
            applyCallback.call(this, ...arguments)
        else
            timeout = setTimeout(applyCallback.bind(this, arguments), wait)

        debounced.cancel = function () {
            clearTimeout(timeout)
            canCall = true
            timeout = null
        }
    }

    return debounced
}
