import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#on', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.on)
  })

  it('should bind event on elements', done => {
    let maki = document.createElement('div')
    maki.classList.add('on', 'maki')

    let maki2 = document.createElement('div')
    maki2.classList.add('on', 'maki2')

    const callback = event => {
      assert.equal(event.target, maki, 'should bind event')

      setTimeout(() => {
        maki.removeEventListener('click', callback)

        done()
      }, 200)
    }

    const listeners = Chirashi.on([maki, maki2], {
      'click': callback
    })

    listeners.off(maki2, 'click')

    maki2.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))

    maki.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
  })
})
