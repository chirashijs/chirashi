import { assert } from 'chai'
import { removeAttr } from 'chirashi'

describe('chirashi#removeAttr', () => {
  it('should be a function', () => {
    assert.isFunction(removeAttr)
  })

  it('should remove attribute of element', () => {
    const sushiLink = document.createElement('a')
    sushiLink.setAttribute('href', 'chirashijs.org')
    sushiLink.setAttribute('data-foo', 'bar')

    removeAttr(sushiLink, 'href', 'data-foo')

    assert.isNull(sushiLink.getAttribute('href'))
    assert.isNull(sushiLink.getAttribute('data-foo'))
    assert.sameDeepMembers(removeAttr(window, 'href'), [window])
  })
})
