import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#ready', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.ready)
  })

  window.it('should listen DOM ready event', done => {
    Chirashi.ready(() => done())

    // Ready event already happened so we have to fake it
    document.dispatchEvent(new window.CustomEvent('DOMContentLoaded', {
      bubbles: true,
      cancelable: true
    }))
  })
})
