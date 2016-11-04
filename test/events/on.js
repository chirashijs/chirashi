import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#on', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.on)
  })

  window.it('should bind event on elements', done => {
    let maki = document.createElement('div')
    maki.classList.add('on', 'maki')

    const callback = event => {
      assert.equal(event.target, maki, 'should bind event')

      setTimeout(() => {
        maki.removeEventListener('click', callback)

        done()
      }, 200)
    }

    Chirashi.on(maki, {
      'click': callback
    })

    maki.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
  })
})
