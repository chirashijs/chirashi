import { assert } from 'chai'
import { removeData } from 'chirashi'

describe('chirashi#removeData', () => {
  it('should be a function', () => {
    assert.isFunction(removeData)
  })

  it('should remove data-attribute of element', () => {
    const sushi = document.createElement('div')
    sushi.setAttribute('data-fish', 'salmon')

    removeData(sushi, 'fish')

    assert.isNull(sushi.getAttribute('data-fish'))
  })
})
