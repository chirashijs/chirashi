/**
 * Return a random integer between two integers
 * @param {number} max - The maximum integer
 * @param {number} [min=0] - The minimum integer
 * @return {function} value - A random interger between min and max
 */
export default function randomIntBetween (max, min = 0) {
  return ~~(Math.random() * (max - min + 1)) + min
}
