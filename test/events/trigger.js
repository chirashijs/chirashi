import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#trigger', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.trigger)
  })

  it('should trigger event', done => {
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
