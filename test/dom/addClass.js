import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#addClass', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.addClass)
  })

  it('should apply class on element', () => {
    const maki = document.createElement('div')
    Chirashi.addClass(maki, ['cheese', 'avocado'])

    assert.isTrue(maki.classList.contains('cheese'))
    assert.sameDeepMembers([window], Chirashi.addClass(window, ['cheese', 'avocado']), 'should just return if element has no classes')
  })
})
