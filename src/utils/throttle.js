/**
 * Execute callback at most once in wait time.
 * @param {function} callback - The callback function
 * @param {number} wait - The waiting time in milliseconds
 * @param {bool} [leading=false] - Execute callback on first trigger
 * @param {bool} [trailing=false] - Execute callback wait time after last execution
 * @return {function} throttled - The throttled callback with cancel method
 */
export default function throttle (callback, wait, leading=true, trailing=true) {
    let last = 0, timeout

    const applyCallback = function() {
        timeout = null
        last = leading ? performance.now() : 0
        callback.call(this, ...arguments)
    }

    const throttled = function() {
        let now = performance.now()

        if (!last && !leading)
            last = now

        let remaining = wait - (now - last)

        if (remaining < 0 || remaining > wait)
            applyCallback.call(this, ...arguments)
        else if (trailing && !timeout)
            timeout = setTimeout(applyCallback.bind(this, arguments), remaining)

        throttled.cancel = function () {
            clearTimeout(timeout)
            last = 0
            timeout = null
        }
    }

    return throttled
}
