import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#prev', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.prev)
  })

  it('should return element\'s prev', () => {
    const maki = document.createElement('div')
    maki.id = 'prev-maki'
    const salmon = document.createElement('div')
    maki.appendChild(salmon)
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.equal(Chirashi.prev(cheese), salmon)
  })
})
