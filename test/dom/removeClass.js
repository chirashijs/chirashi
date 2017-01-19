import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#removeClass', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.removeClass)
  })

  it('should apply class on element', () => {
    const maki = document.createElement('div')
    maki.classList.add('cheese')
    Chirashi.removeClass(maki, 'cheese')

    assert.isFalse(maki.classList.contains('cheese'))
  })
})
