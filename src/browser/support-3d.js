import prefix from './prefix'

document.documentElement.style[prefix+'matrix'] = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
var support3D = document.documentElement.style[prefix+'matrix']
document.documentElement.style[prefix+'matrix'] = ''

export default support3D
