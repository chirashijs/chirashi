import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#setData', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.setData)
  })

  it('should set data-attribute on element', () => {
    const maki = document.createElement('div')

    Chirashi.setData(maki, { fish: 'salmon' })

    assert.equal(maki.getAttribute('data-fish'), 'salmon')
  })
})
