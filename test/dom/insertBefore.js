import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#insertBefore', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.insertBefore)
  })

  window.it('should return element\'s insertBefore', () => {
    const maki = document.createElement('div')
    maki.id = 'insert-before-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    const salmon = document.createElement('div')

    Chirashi.insertBefore(cheese, salmon)

    assert.equal(cheese.previousElementSibling, salmon, 'should insert existing node')

    Chirashi.insertBefore(cheese, '.wasabi')

    assert.isTrue(cheese.previousElementSibling.classList.contains('wasabi'), 'should create and insert node')

    assert.isUndefined(Chirashi.insertBefore(window, '.null'), 'should just return if node can\'t be inserted')

    assert.equal(maki, Chirashi.insertBefore(maki, 149), 'should return element if trying to append something wrong')
  })
})
