import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#toggleClass', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.toggleClass)
  })

  it('should toggle class on element', () => {
    const maki = document.createElement('div')
    maki.classList.add('cheese')

    Chirashi.toggleClass(maki, 'cheese')
    assert.isFalse(maki.classList.contains('cheese'), 'remove class if present')

    Chirashi.toggleClass(maki, 'cheese')
    assert.isTrue(maki.classList.contains('cheese'), 'add class if missing')

    assert.sameDeepMembers([window], Chirashi.toggleClass(window, ['cheese', 'avocado']), 'should just return if element has no classes')

    const scdMaki = maki.cloneNode(true)

    maki.setAttribute('data-for', 'leonard')
    scdMaki.setAttribute('data-for', 'sheldon')

    Chirashi.toggleClass([maki, scdMaki], {
      cheese: element => {
        return element.getAttribute('data-for') !== 'leonard'
      }
    })

    assert.isFalse(maki.classList.contains('cheese'), 'remove class if condition is false')
    assert.isTrue(scdMaki.classList.contains('cheese'), 'add class if condition is true')
    assert.sameDeepMembers([window], Chirashi.toggleClass(window, {
      cheese: element => {
        return true
      }
    }), 'should just return if element has no classes')
  })
})
