import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#append', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.append)
  })

  window.it('should append child into element', () => {
    const maki = document.createElement('div')
    const salmon = document.createElement('div')
    Chirashi.append(maki, [salmon, '.cheese'])

    assert.equal(maki.firstChild, salmon, 'should append existing node')
    assert.isTrue(maki.children[1].classList.contains('cheese'), 'should create and append node')
    assert.isUndefined(Chirashi.append(window, maki), 'should return if node can\'t be append')
    assert.equal(maki, Chirashi.append(maki, 149), 'should return element if trying to append something wrong')
  })
})
