import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#setProp', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.setProp)
  })

  window.it('should set property on element', () => {
    const input = document.createElement('input')

    Chirashi.setProp(input, { value: 'こんにちは世界' })

    assert.equal(input.value, 'こんにちは世界')
  })
})
