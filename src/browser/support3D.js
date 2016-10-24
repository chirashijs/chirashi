import prefix from './prefix'

const property = `${prefix}Transform`
document.documentElement.style[property] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'

/** Variable true if the browser supports 3d css transformations. */
const support3d = !!document.documentElement.style[property]

document.documentElement.style[property] = ''

export default support3d
