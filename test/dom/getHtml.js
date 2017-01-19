import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#getHtml', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.getHtml)
  })

  it('should return inner html of element', () => {
    const maki = document.createElement('p')
    maki.innerHTML = 'this maki contains cheese'

    assert.equal(Chirashi.getHtml(maki), 'this maki contains cheese')
  })
})
