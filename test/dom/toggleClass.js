import { assert } from 'chai'
import { toggleClass } from 'chirashi'

describe('chirashi#toggleClass', () => {
  it('should be a function', () => {
    assert.isFunction(toggleClass)
  })

  it('should toggle class on element', () => {
    const maki = document.createElement('div')
    maki.classList.add('cheese')

    toggleClass(maki, 'cheese')
    assert.isFalse(maki.classList.contains('cheese'), 'remove class if present')

    toggleClass(maki, 'cheese', 'avocado')
    assert.isTrue(maki.classList.contains('cheese'), 'add class if missing')
    assert.isTrue(maki.classList.contains('avocado'), 'add multiple class if missing')

    const scdMaki = maki.cloneNode(true)

    maki.setAttribute('data-for', 'leonard')
    scdMaki.setAttribute('data-for', 'sheldon')

    toggleClass([maki, scdMaki], {
      'cream cheese': element => {
        return element.getAttribute('data-for') !== 'leonard'
      }
    })

    assert.isTrue(!maki.classList.contains('cream') && !maki.classList.contains('cheese'), 'remove class if condition is false')
    assert.isTrue(scdMaki.classList.contains('cream') && scdMaki.classList.contains('cheese'), 'add class if condition is true')
  })
})
