import off from './off'

export function unscroll (callback) {
  off(window, 'scroll mousewheel DOMMouseScroll', callback)
}

export default unscroll
