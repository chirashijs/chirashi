import { assert } from 'chai'
import { ready } from 'chirashi'

describe('chirashi#ready', () => {
  it('should be a function', () => {
    assert.isFunction(ready)
  })

  it('should listen DOM ready event', done => {
    let called = 0
    const callback = () => {
      ++called

      if (called === 2) done()
    }

    ready(callback, 'loading') // DOM state already complete

    ready(callback) // DOM state already loading

    // Ready event already happened so we have to fake it
    document.dispatchEvent(new window.CustomEvent('DOMContentLoaded', {
      bubbles: true,
      cancelable: true
    }))
  })
})
