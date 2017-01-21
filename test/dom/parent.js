import { assert } from 'chai'
import { parent } from 'chirashi'

describe('chirashi#parent', () => {
  it('should be a function', () => {
    assert.isFunction(parent)
  })

  it('should return element\'s parent', () => {
    const maki = document.createElement('div')
    maki.id = 'parent-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.equal(parent(cheese), maki)
  })
})
