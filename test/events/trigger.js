import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#trigger', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.trigger)
  })

  window.it('should trigger event', done => {
    let maki = document.createElement('div')
    maki.classList.add('trigger', 'maki')

    const callback = event => {
      assert.equal(event.target, maki, 'should trigger event')

      maki.removeEventListener('click', callback)

      done()
    }

    maki.addEventListener('click', callback)

    Chirashi.trigger(maki, 'click')

    assert.isUndefined(Chirashi.trigger(null, 'click'))
  })
})
