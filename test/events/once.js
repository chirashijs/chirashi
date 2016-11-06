import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#once', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.once)
  })

  window.it('should bind event once on elements', done => {
    let listener

    let called = 0

    let maki = document.createElement('div')
    maki.classList.add('once', 'maki')

    let maki2 = document.createElement('div')
    maki2.classList.add('once', 'maki2')

    const callback = event => {
      ++called

      if (called === 1) {
        assert.equal(event.currentTarget, maki)
        assert.equal(event.type, 'click')
      } else if (called === 2) {
        assert.equal(event.currentTarget, maki2)
        assert.equal(event.type, 'click')
      } else if (called === 3) {
        assert.equal(event.currentTarget, maki)
        assert.equal(event.type, 'cliclick')

        listener.cancel()
        done()
      }
    }

    listener = Chirashi.once([maki, maki2], {
      'click': callback,
      'cliclick': callback
    }, true, true)

    maki.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
    maki2.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
    maki.dispatchEvent(new window.CustomEvent('click', {
      bubbles: true,
      cancelable: true
    }))
    maki.dispatchEvent(new window.CustomEvent('cliclick', {
      bubbles: true,
      cancelable: true
    }))
  })
})
