import { assert } from 'chai'
import { hasClass } from 'chirashi'

describe('chirashi#hasClass', () => {
  it('should be a function', () => {
    assert.isFunction(hasClass)
  })

  it('should apply class on element', () => {
    const maki = document.createElement('div')
    maki.classList.add('cheese', 'avocado')

    assert.isTrue(hasClass(maki, ['cheese', 'avocado']), 'should return true if all classes are on element')
    assert.isFalse(hasClass(maki, ['cheese', 'wasabi']), 'should return false if one of classes isn\'t on element')
    assert.isUndefined(hasClass(window, ['cheese', 'avocado']), 'should just return if element has no classes')
  })
})
