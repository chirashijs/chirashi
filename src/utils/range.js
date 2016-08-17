/**
 * Return value if in the range, max if greater, min if lower
 * @param {number} value - The tested value
 * @param {number} [max=1] - The maximum value
 * @param {number} [min=0] - The minimum value
 * @return {function} value - A random interger between min and max or max if value isn't a number
 */
export default function range(value, max=1, min=0) {
    return isNaN(value) ? max : Math.min(Math.max(value, min), max)
}
