import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#clone', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.clone)
  })

  it('should return element\'s clone', () => {
    const maki = document.createElement('div')
    maki.id = 'clone-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.deepEqual(maki, Chirashi.clone(maki))
    assert.isFalse(Chirashi.clone(window))
  })
})
