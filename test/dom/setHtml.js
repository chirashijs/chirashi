import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#setHtml', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.setHtml)
  })

  it('should set property on element', () => {
    const title = document.createElement('h1')

    Chirashi.setHtml(title, 'salmon')

    assert.equal(title.innerHTML, 'salmon')
  })
})
