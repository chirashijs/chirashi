import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#clone', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.clone)
  })

  window.it('should return element\'s clone', () => {
    const maki = document.createElement('div')
    maki.id = 'clone-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    assert.deepEqual(maki, Chirashi.clone(maki))
    assert.isFalse(Chirashi.clone(window))
  })
})
