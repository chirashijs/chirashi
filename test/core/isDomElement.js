import { assert } from 'chai'
import { isDomElement } from 'chirashi'

describe('chirashi#isDomElement', () => {
  it('should return a function', () => {
    assert.isFunction(isDomElement)
  })

  it('should detect DOM Element', () => {
    assert.isTrue(isDomElement(window), 'true for window')
    assert.isTrue(isDomElement(document), 'true for document')
    assert.isTrue(isDomElement(document.createElement('div')), 'true for div')
    assert.isFalse(isDomElement(null), 'false for null')
  })
})
