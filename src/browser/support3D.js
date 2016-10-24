import prefix from './prefix'

const property = `${prefix}Transform`
document.documentElement.style[property] = 'matrix3D(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'

/** Variable true if the browser supports 3D css transformations. */
const support3D = !!document.documentElement.style[property]

document.documentElement.style[property] = ''

export default support3D
