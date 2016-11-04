import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#insertAfter', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.insertAfter)
  })

  window.it('should return element\'s insertAfter', () => {
    const maki = document.createElement('div')
    maki.id = 'insert-after-maki'
    const salmon = document.createElement('div')
    maki.appendChild(salmon)

    const cheese = document.createElement('div')

    Chirashi.insertAfter(salmon, cheese)

    assert.equal(cheese.previousElementSibling, salmon, 'should insert existing node')

    Chirashi.insertAfter(salmon, '.wasabi')

    assert.isTrue(cheese.previousElementSibling.classList.contains('wasabi'), 'should create and insert node')

    assert.isUndefined(Chirashi.insertAfter(window, '.null'), 'should just return if node can\'t be inserted')

    assert.equal(maki, Chirashi.insertAfter(maki, 149), 'should return element if trying to append something wrong')
  })
})
