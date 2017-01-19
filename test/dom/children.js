import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#children', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.children)
  })

  it('should return element\'s children', () => {
    const maki = document.createElement('div')
    maki.id = 'children-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)
    document.body.appendChild(maki)

    assert.sameDeepMembers([cheese], Chirashi.children('#children-maki'))

    document.body.removeChild(maki)
  })
})
