import raf from 'raf'

import on from './on'

export function resize (userCallback) {
  let callbackRaf
  let callback = () => {
    raf.cancel(callbackRaf)
    callbackRaf = raf(() => {
        userCallback({
          width: window.innerWidth,
          height: window.innerHeight
        })
    })
  }

  on(window, 'resize', callback)

  return callback
}

export default resize
