import { assert } from 'chai'
import { addClass } from 'chirashi'

describe('chirashi#addClass', () => {
  it('should be a function', () => {
    assert.isFunction(addClass)
  })

  it('should apply class on element', () => {
    const maki = document.createElement('div')
    addClass(maki, 'cheese', 'avocado')

    assert.isTrue(maki.classList.contains('cheese'))
    assert.isTrue(maki.classList.contains('avocado'))
  })
})
