import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#parent', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.parent)
  })

  it('should return element\'s parent', () => {
    const maki = document.createElement('div')
    maki.id = 'parent-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.equal(Chirashi.parent(cheese), maki)
  })
})
