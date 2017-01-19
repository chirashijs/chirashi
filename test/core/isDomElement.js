import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#isDomElement', () => {
  it('should return a function', () => {
    assert.isFunction(Chirashi.isDomElement)
  })

  it('should detect DOM Element', () => {
    assert.isTrue(Chirashi.isDomElement(window), 'true for window')
    assert.isTrue(Chirashi.isDomElement(document), 'true for document')
    assert.isTrue(Chirashi.isDomElement(document.createElement('div')), 'true for div')
    assert.isFalse(Chirashi.isDomElement(null), 'false for null')
  })
})
