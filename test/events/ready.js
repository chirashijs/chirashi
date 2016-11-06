import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#ready', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.ready)
  })

  window.it('should listen DOM ready event', done => {
    let called = 0
    const callback = () => {
      ++called

      if (called === 2) done()
    }

    Chirashi.ready(callback) // DOM state already complete

    document.__defineGetter__('readyState', () => {
      return 'loading'
    })

    Chirashi.ready(callback) // DOM state already loading

    document.__defineGetter__('readyState', () => {
      return 'complete'
    })

    // Ready event already happened so we have to fake it
    document.dispatchEvent(new window.CustomEvent('DOMContentLoaded', {
      bubbles: true,
      cancelable: true
    }))
  })
})
