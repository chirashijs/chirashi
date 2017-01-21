import { assert } from 'chai'
import { setAttr } from 'chirashi'

describe('chirashi#setAttr', () => {
  it('should be a function', () => {
    assert.isFunction(setAttr)
  })

  it('should set attribute on element', () => {
    const sushiLink = document.createElement('a')

    setAttr(sushiLink, { href: 'chirashijs.org', 'data-fish': 'salmon', 'data-other': ['soya', 'wasabi'], 'data-info': {name: 'salmon sushi', fish: 'sushi'} })

    assert.equal(sushiLink.getAttribute('href'), 'chirashijs.org', 'should support simple attribute')
    assert.equal(sushiLink.getAttribute('data-fish'), 'salmon', 'should support simple data-attribute')
    assert.equal(sushiLink.getAttribute('data-other'), 'soya,wasabi', 'should support simple array')
    assert.equal(sushiLink.getAttribute('data-info'), '{"name":"salmon sushi","fish":"sushi"}', 'should support object')
  })
})
