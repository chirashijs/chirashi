import { assert } from 'chai'
import { setHtml } from 'chirashi'

describe('chirashi#setHtml', () => {
  it('should be a function', () => {
    assert.isFunction(setHtml)
  })

  it('should set property on element', () => {
    const title = document.createElement('h1')

    setHtml(title, 'salmon')

    assert.equal(title.innerHTML, 'salmon')
  })
})
