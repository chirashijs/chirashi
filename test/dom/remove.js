import { assert } from 'chai'
import { remove } from 'chirashi'

describe('chirashi#remove', () => {
  it('should be a function', () => {
    assert.isFunction(remove)
  })

  it('should remove element from dom', () => {
    const sushi = document.createElement('div')
    const cheese = document.createElement('div')

    sushi.appendChild(cheese)

    remove(cheese)

    assert.isNull(cheese.parentNode, 'should have removed element from dom')

    remove(cheese)
    assert.isNull(cheese.parentNode, 'should not fail when element is no longer in the dom')
  })
})
