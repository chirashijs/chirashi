import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#removeData', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.removeData)
  })

  window.it('should remove data-attribute of element', () => {
    const sushi = document.createElement('div')
    sushi.setAttribute('data-fish', 'salmon')

    Chirashi.removeData(sushi, 'fish')

    assert.isNull(sushi.getAttribute('data-fish'))
  })
})
