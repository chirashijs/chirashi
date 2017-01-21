import { assert } from 'chai'
import { setProp } from 'chirashi'

describe('chirashi#setProp', () => {
  it('should be a function', () => {
    assert.isFunction(setProp)
  })

  it('should set property on element', () => {
    const input = document.createElement('input')

    setProp(input, { value: 'こんにちは世界' })

    assert.equal(input.value, 'こんにちは世界')
  })
})
