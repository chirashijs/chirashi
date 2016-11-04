import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#once', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.once)
  })

  window.it('should bind event once on elements', done => {
    let called = 0

    let maki = document.createElement('div')
    maki.classList.add('once', 'maki')

    const callback = event => {
      assert.equal(event.target, maki, 'should bind event')
      assert.equal(++called, 1, 'should unbind event')

      setTimeout(done, 200)
    }

    Chirashi.once(maki, {
      'click': callback
    })

    maki.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
    maki.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
  })
})
