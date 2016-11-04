import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#next', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.next)
  })

  window.it('should return element\'s next', () => {
    const maki = document.createElement('div')
    maki.id = 'next-maki'
    const salmon = document.createElement('div')
    maki.appendChild(salmon)
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.equal(Chirashi.next(salmon), cheese)
  })
})
