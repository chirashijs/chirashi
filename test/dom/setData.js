import { assert } from 'chai'
import { setData } from 'chirashi'

describe('chirashi#setData', () => {
  it('should be a function', () => {
    assert.isFunction(setData)
  })

  it('should set data-attribute on element', () => {
    const maki = document.createElement('div')

    setData(maki, { fish: 'salmon' })

    assert.equal(maki.getAttribute('data-fish'), 'salmon')
  })
})
