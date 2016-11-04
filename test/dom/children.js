import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#children', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.children)
  })

  window.it('should return element\'s children', () => {
    const maki = document.createElement('div')
    maki.id = 'children-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)
    document.body.appendChild(maki)

    assert.sameDeepMembers([cheese], Chirashi.children('#children-maki'))

    document.body.removeChild(maki)
  })
})
