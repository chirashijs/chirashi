/**
 * Return a random number between two values
 * @param {number} max - The maximum value
 * @param {number} [min=0] - The minimum value
 * @return {function} value - A random value between min and max
 */
export default function randomBetween (max, min = 0) {
  return Math.random() * (max - min) + min
}
