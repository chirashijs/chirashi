import { assert } from 'chai'
import { getHtml } from 'chirashi'

describe('chirashi#getHtml', () => {
  it('should be a function', () => {
    assert.isFunction(getHtml)
  })

  it('should return inner html of element', () => {
    const maki = document.createElement('p')
    maki.innerHTML = 'this maki contains cheese'

    assert.equal(getHtml(maki), 'this maki contains cheese')
  })
})
