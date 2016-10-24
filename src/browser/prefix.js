/** Browser prefix for styling. */
const prefix = (
  [...window.getComputedStyle(document.documentElement, '')]
  .join('')
  .match(/-(moz|webkit|ms)-/) || (window.styles.OLink === '' && ['', 'o'])
)[1]

export default prefix
