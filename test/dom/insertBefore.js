import { assert } from 'chai'
import { insertBefore } from 'chirashi'

describe('chirashi#insertBefore', () => {
  it('should be a function', () => {
    assert.isFunction(insertBefore)
  })

  it('should return element\'s insertBefore', () => {
    const maki = document.createElement('div')
    maki.id = 'insert-before-maki'
    const cheese = document.createElement('div')
    maki.appendChild(cheese)

    const salmon = document.createElement('div')

    insertBefore(cheese, salmon)

    assert.equal(cheese.previousElementSibling, salmon, 'should insert existing node')

    insertBefore(cheese, '.wasabi')

    assert.isTrue(cheese.previousElementSibling.classList.contains('wasabi'), 'should create and insert node')
  })
})
