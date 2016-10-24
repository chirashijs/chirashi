import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#isDomElement', () => {

  window.it('should return a function', () => {
    assert.equal(typeof Chirashi.isDomElement, 'function')
  })

  window.it('should detect DOM Element', () => {
    assert.ok(Chirashi.isDomElement(window), 'true for window')
    assert.ok(Chirashi.isDomElement(document), 'true for document')
    assert.ok(Chirashi.isDomElement(document.createElement('div')), 'true for div')
    assert.ok(!Chirashi.isDomElement(null), 'false for null')
  })
})
