import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#indexInParent', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.indexInParent)
  })

  it('should return element\'s index in its parent\'s children', () => {
    const maki = document.createElement('div')
    maki.id = 'index-in-parent-maki'
    const salmon = document.createElement('div')
    maki.appendChild(salmon)
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.equal(Chirashi.indexInParent(salmon), 0, 'should return element\'s index')
    assert.equal(Chirashi.indexInParent(cheese), 1, 'should return element\'s index')

    assert.isNull(Chirashi.indexInParent(null), 'should return null if no element found')
  })
})
