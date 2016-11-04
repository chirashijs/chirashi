import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#parent', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.parent)
  })

  window.it('should return element\'s parent', () => {
    const maki = document.createElement('div')
    maki.id = 'parent-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.equal(Chirashi.parent(cheese), maki)
  })
})
