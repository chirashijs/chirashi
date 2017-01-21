import { assert } from 'chai'
import { clone } from 'chirashi'

describe('chirashi#clone', () => {
  it('should be a function', () => {
    assert.isFunction(clone)
  })

  it('should return element\'s clone', () => {
    const maki = document.createElement('div')
    maki.id = 'clone-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.deepEqual(maki, clone(maki))
    assert.isFalse(clone(window))
  })
})
