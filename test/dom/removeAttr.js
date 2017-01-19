import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#removeAttr', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.removeAttr)
  })

  it('should remove attribute of element', () => {
    const sushiLink = document.createElement('a')
    sushiLink.setAttribute('href', 'chirashijs.org')

    Chirashi.removeAttr(sushiLink, 'href')

    assert.isNull(sushiLink.getAttribute('href'))
    assert.sameDeepMembers(Chirashi.removeAttr(window, 'href'), [window])
  })
})
