import { assert } from 'chai'
import { trigger } from 'chirashi'

describe('chirashi#trigger', () => {
  it('should be a function', () => {
    assert.isFunction(trigger)
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

    trigger(maki, 'click')

    assert.isUndefined(trigger(null, 'click'))
  })
})
