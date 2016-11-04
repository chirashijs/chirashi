import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#hasClass', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.hasClass)
  })

  window.it('should apply class on element', () => {
    const maki = document.createElement('div')
    maki.classList.add('cheese', 'avocado')

    assert.isTrue(Chirashi.hasClass(maki, ['cheese', 'avocado']), 'should return true if all classes are on element')
    assert.isFalse(Chirashi.hasClass(maki, ['cheese', 'wasabi']), 'should return false if one of classes isn\'t on element')
    assert.isUndefined(Chirashi.hasClass(window, ['cheese', 'avocado']), 'should just return if element has no classes')
  })
})
