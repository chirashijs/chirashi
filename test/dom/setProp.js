import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#setProp', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.setProp)
  })

  it('should set property on element', () => {
    const input = document.createElement('input')

    Chirashi.setProp(input, { value: 'こんにちは世界' })

    assert.equal(input.value, 'こんにちは世界')
  })
})
