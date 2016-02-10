import assert from 'assert'
import isDomElement from '../../src/core/is-dom-element'

describe('chirashi#isDomElement', () => {

    it('should return a function', () => {
        assert.equal(typeof isDomElement, 'function')
    })

    it('should detect DOM Element', () => {
        assert.ok(isDomElement(window), 'true for window')
        assert.ok(isDomElement(document), 'true for document')
        assert.ok(isDomElement(document.createElement('div')), 'true for div')
        assert.ok(!isDomElement(null), 'false for null')
    })
})
