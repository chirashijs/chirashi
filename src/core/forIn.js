/**
 * Iterates over object's keys and apply callback on each one.
 * @param {Object} object - The iterable
 * @param {function} callback - The function to call for each iteratee
 * @param {bool} [forceOrder=false] - Respect keys order
 * @return {Object} object - The iterable for chaining
 */
export default function forIn(object, callback, forceOrder = false) {
    if (typeof object != 'object') return

    let keys = Object.keys(object)

    if (!forceOrder) {
        let i = keys.length

        while(i--) {
            let key = keys[i]
            callback(key, object[key])
        }
    }
    else {
        let i = -1, len = keys.length
        while(++i < len) {
            let key = keys[i]
            callback(key, object[key])
        }
    }

    return object
}
